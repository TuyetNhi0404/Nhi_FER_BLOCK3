

import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (recipe, quantity) => {
    const existingItem = cart.find((item) => item.id === recipe.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === recipe.id ? { ...item, quantity: item.quantity + quantity } : item)))
    } else {
      setCart([...cart, { ...recipe, quantity }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getTotalCartItems,
        getTotalCartPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
