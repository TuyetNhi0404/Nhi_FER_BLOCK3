import { createContext, useReducer, useMemo, useCallback, useEffect } from "react";

export const WishlistContext = createContext();

const initial = { items: [] }; 

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.items.find((p) => p.id === action.product.id);
      if (exists) {
        return { items: state.items.filter((p) => p.id !== action.product.id) };
      }
      return { items: [...state.items, action.product] };
    }
    case "REMOVE": {
      return { items: state.items.filter((p) => p.id !== action.id) };
    }
    case "CLEAR_ALL": {
      return { items: [] };
    }
    default:
      return state;
  }
}

// init từ localStorage
function init(initial) {
  try {
    const saved = JSON.parse(localStorage.getItem("wishlist_items"));
    return { items: Array.isArray(saved) ? saved : [] };
  } catch {
    return initial;
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial, init);

  // ghi vào localStorage mỗi khi items thay đổi
  useEffect(() => {
    localStorage.setItem("wishlist_items", JSON.stringify(state.items));
  }, [state.items]);

  const toggleWishlist = useCallback(
    (product) => dispatch({ type: "TOGGLE", product }),
    []
  );
  const removeFromWishlist = useCallback(
  (id) => dispatch({ type: "REMOVE", id }),
  []
);

const clearWishlist = useCallback(
  () => dispatch({ type: "CLEAR_ALL" }),
  []
);
  const ids = useMemo(() => new Set(state.items.map(i => i.id)), [state.items]);

  return (
    <WishlistContext.Provider value={{ wishlist: state.items, toggleWishlist, ids, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
