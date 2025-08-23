import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const API = "http://localhost:3001/cart";

// Reducer quản lý state
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

  // Load cart từ db.json khi app start
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

  // Add to Cart (nếu có thì tăng quantity, chưa có thì POST mới)
  const addToCart = async (product) => {
    const existingItem = state.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      try {
        await fetch(`${API}/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { id: existingItem.id, quantity: newQuantity },
        });
      } catch (e) {
        console.warn("updateQuantity server miss:", e);
      }
    } else {
      const newItem = { ...product, productId: product.id, quantity: 1 };
      delete newItem.id; // tránh trùng id với product gốc

      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        const saved = await res.json();
        dispatch({ type: "ADD_TO_CART", payload: saved });
      } catch (e) {
        console.error("addToCart error:", e);
      }
    }
  };

  // Remove from cart (DELETE cả db.json + state)
  const removeFromCart = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } catch (e) {
      console.warn("removeFromCart error:", e);
    }
  };

  // Update quantity (PATCH db.json + state)
  const updateQuantity = async (id, quantity) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    } catch (e) {
      console.warn("updateQuantity error:", e);
    }
  };

  // Clear cart (xóa hết trong db.json + state)
  const clearCart = async () => {
    try {
      await Promise.all(
        state.items.map((item) =>
          fetch(`${API}/${item.id}`, { method: "DELETE" })
        )
      );
      dispatch({ type: "CLEAR_CART" });
    } catch (e) {
      console.warn("clearCart error:", e);
    }
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
