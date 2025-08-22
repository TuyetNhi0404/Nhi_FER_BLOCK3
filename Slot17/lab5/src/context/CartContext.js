import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const API = "http://localhost:3001/cart";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.payload };

    case "ADD_TO_CART":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart từ db.json
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        dispatch({ type: "SET_CART", payload: data || [] });
      } catch (e) {
        console.error("Load cart error:", e);
      }
    })();
  }, []);

  // ✅ Add to Cart (cộng quantity nếu đã tồn tại)
  const addToCart = async (product) => {
    // Kiểm tra đã có trong cart chưa (so sánh theo productId)
    const existingItem = state.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      // Nếu có rồi → tăng quantity
      const newQuantity = existingItem.quantity + 1;
      try {
        await fetch(`${API}/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      } catch (e) {
        console.warn("updateQuantity server miss:", e);
      }
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: existingItem.id, quantity: newQuantity },
      });
    } else {
      // Nếu chưa có → thêm mới (dùng productId = id gốc của sản phẩm)
      const newItem = { ...product, productId: product.id, quantity: 1 };
      delete newItem.id; // tránh trùng với id của json-server
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        const saved = await res.json(); // json-server trả về item có id mới
        dispatch({ type: "ADD_TO_CART", payload: saved });
      } catch (e) {
        console.error("addToCart error:", e);
      }
    }
  };

  const removeFromCart = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("removeFromCart server miss:", e);
    }
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
    } catch (e) {
      console.warn("updateQuantity server miss:", e);
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = async () => {
    try {
      for (const item of state.items) {
        await fetch(`${API}/${item.id}`, { method: "DELETE" });
      }
    } catch (e) {
      console.warn("clearCart warnings:", e);
    }
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () =>
    state.items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    state.items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
