import { create } from "zustand";

export const useUiStore = create((set) => ({
    authModalOpen: false,
    authModalMode: "login", // 'login' | 'register'
    editDeckId: null,

    openAuthModal: (mode = "login") => set({ authModalOpen: true, authModalMode: mode }),
    closeAuthModal: () => set({ authModalOpen: false }),
    setAuthModalMode: (mode) => set({ authModalMode: mode }),

    openDeckEditor: (deckId) => set({ editDeckId: deckId }),
    closeDeckEditor: () => set({ editDeckId: null }),
}));
