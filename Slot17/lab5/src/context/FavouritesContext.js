import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FavouritesContext = createContext();
export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error("useFavourites must be used within a FavouritesProvider");
  return context;
};

const API = "http://localhost:3001/favourites";

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVOURITES":
      return { ...state, items: action.payload };

    case "ADD_TO_FAVOURITES":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_FROM_FAVOURITES":
      return { ...state, items: state.items.filter((i) => i.favouriteId !== action.payload) };

    case "CLEAR_FAVOURITES":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, { items: [] });

  // load từ db.json
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        dispatch({ type: "SET_FAVOURITES", payload: data || [] });
      } catch (e) {
        console.error("Load favourites error:", e);
      }
    })();
  }, []);

  // Thêm sản phẩm vào favourites (id gốc giữ nguyên, favouriteId dùng để quản lý trong DB)
  const addToFavourites = async (product) => {
    const newItem = { ...product, favouriteId: uuidv4() };
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      dispatch({ type: "ADD_TO_FAVOURITES", payload: newItem });
    } catch (e) {
      console.error("addToFavourites error:", e);
    }
  };

  // Xóa khỏi favourites bằng favouriteId
  const removeFromFavourites = async (favouriteId) => {
    try {
      await fetch(`${API}/${favouriteId}`, { method: "DELETE" });
    } catch (e) {
      console.warn("removeFromFavourites server miss:", e);
    }
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: favouriteId });
  };

  // Xóa hết favourites
  const clearFavourites = async () => {
    try {
      for (const item of state.items) {
        await fetch(`${API}/${item.favouriteId}`, { method: "DELETE" });
      }
    } catch (e) {
      console.warn("clearFavourites warnings:", e);
    }
    dispatch({ type: "CLEAR_FAVOURITES" });
  };

  // Kiểm tra đã có trong favourites theo product.id gốc
  const isFavourite = (id) => state.items.some((i) => i.id === id);

  const getTotalFavourites = () => state.items.length;

  return (
    <FavouritesContext.Provider
      value={{
        items: state.items,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        isFavourite,
        getTotalFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
