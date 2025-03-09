import { create } from "zustand";
import { fetchCart, addToCart, deleteCart } from "../api/CartApi";

const useCartStore = create((set) => ({
  cart: [],
  totalPrice: 0,

  fetchCart: async (userId) => {
    const { cartItems, total } = await fetchCart(userId);
    set({ cart: cartItems, totalPrice: total });
  },

  addToCart: async (userId, products) => {
    const newProducts = await addToCart(userId, products);
    set((state) => {
      const updatedCart = [...state.cart, ...newProducts];
      const updatedTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { cart: updatedCart, totalPrice: updatedTotal };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      const updatedTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { cart: updatedCart, totalPrice: updatedTotal };
    });
  },

  deleteCart: async (userId) => {
    const success = await deleteCart(userId);
    if (success) {
      set({ cart: [], totalPrice: 0 });
    }
  },
}));

export default useCartStore;
