import { create } from "zustand";
import {
  fetchProducts,
  fetchProductsById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/ProductApi";

const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const product = await fetchProductsById(id);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? product : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  addNewProduct: async (product) => {
    try {
      const newProduct = await addProduct(product);
      set((state) => ({ products: [...state.products, newProduct] }));
    } catch (error) {
      set({ error });
    }
  },

  updateExistingProduct: async (id, updatedData) => {
    try {
      const updatedProduct = await updateProduct({ id, updatedData });
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? updatedProduct : p
        ),
      }));
    } catch (error) {
      set({ error });
    }
  },

  removeProduct: async (id) => {
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      set({ error });
    }
  },
}));

export default useProductStore;
