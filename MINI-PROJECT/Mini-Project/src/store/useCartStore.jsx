import { create } from "zustand";

const useCartStore = create((set) => ({
  allCarts: [],

  fetchAllCarts: async () => {
    const response = await fetch("https://dummyjson.com/carts");
    const data = await response.json();
    set({ allCarts: data.carts });
  },

  addToUserCart: async (userId, products) => {
    const response = await fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, products }),
    });
    const newCart = await response.json();
    set((state) => ({ allCarts: [...state.allCarts, newCart] }));
  },

  updateCart: async (cartId, product) => {
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [product],
      }),
    });
    const updatedCart = await response.json();
    set((state) => ({
      allCarts: state.allCarts.map((cart) =>
        cart.id === cartId ? updatedCart : cart
      ),
    }));
  },

  removeCart: async (cartId) => {
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "DELETE",
    });
    await response.json();
    set((state) => ({
      allCarts: state.allCarts.filter((cart) => cart.id !== cartId),
    }));
  },
}));

export default useCartStore;
