import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  refreshToken: null,

  login: ({ user, token, refreshToken }) =>
    set({ user, token, refreshToken }),

  logout: () => set({ user: null, token: null, refreshToken: null }),
}));

export default useAuthStore;
  