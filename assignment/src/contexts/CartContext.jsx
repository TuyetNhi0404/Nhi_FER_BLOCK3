import { createContext, useReducer, useMemo, useCallback, useEffect } from "react";

export const CartContext = createContext();

const initial = { items: [] }; 

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === exists.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case "INC":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case "DEC":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        ),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

// init từ localStorage ngay khi tạo reducer
function init(initial) {
  try {
    const saved = JSON.parse(localStorage.getItem("cart_items"));
    return { items: Array.isArray(saved) ? saved : [] };
  } catch {
    return initial;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial, init);

  // ghi vào localStorage mỗi khi items thay đổi
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((p) => {
    const payload = {
      id: p.id,
      title: p.title,
      price: p.salePrice ?? p.price,
      image: p.image,
    };
    dispatch({ type: "ADD", payload });
  }, []);

  const removeFromCart = useCallback((id) => dispatch({ type: "REMOVE", id }), []);
  const incQty = useCallback((id) => dispatch({ type: "INC", id }), []);
  const decQty = useCallback((id) => dispatch({ type: "DEC", id }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const count = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.qty * i.price, 0), [state.items]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, incQty, decQty, clearCart, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
