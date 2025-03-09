import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  sortOrder: "asc", 
  setSortOrder: (order) => set({ sortOrder: order }),
}));

export default useSearchStore;
