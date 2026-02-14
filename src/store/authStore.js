import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/authService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      setUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),

      login: (userData) =>
        set({ user: userData, token: userData.token, error: null }),

      logout: () => set({ user: null, token: null, error: null }),

      isAuthenticated: () => !!get().token,

      loginAsync: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.login(email, password);
          set({
            user: { _id: data._id, name: data.name, email: data.email, credits: data.credits },
            token: data.token,
            loading: false,
          });
          return data;
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          set({ loading: false, error: message });
          throw new Error(message);
        }
      },

      registerAsync: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.register(name, email, password);
          set({
            user: { _id: data._id, name: data.name, email: data.email, credits: data.credits },
            token: data.token,
            loading: false,
          });
          return data;
        } catch (err) {
          const message = err.response?.data?.message || "Registration failed";
          set({ loading: false, error: message });
          throw new Error(message);
        }
      },

      fetchProfile: async () => {
        try {
          const data = await authService.getProfile();
          set((state) => ({
            user: { ...state.user, ...data },
          }));
          return data;
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "pixlflip-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
