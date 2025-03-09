import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useDashboardStore = create(
  persist(
    (set) => ({
      quotes: [],
      recipes: [],
      fetchQuotes: async () => {
        try {
          const res = await axios.get("https://dummyjson.com/quotes");
          set({ quotes: res.data.quotes });
        } catch (error) {
          console.error("Error fetching quotes:", error);
        }
      },
      fetchRecipes: async () => {
        try {
          const res = await axios.get("https://dummyjson.com/recipes");
          set({ recipes: res.data.recipes });
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      },
    }),
  )
);

export default useDashboardStore;
