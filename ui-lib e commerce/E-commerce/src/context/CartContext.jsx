import { createContext, useState, useEffect } from "react";
import { fetchCart, addToCart, removeFromCart } from "@/api/FakeStoreApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart().then(setCart);
  }, []);

  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId);
    if (success) {
      fetchCart().then(setCart);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const success = await removeFromCart(productId);
    if (success) {
      fetchCart().then(setCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
