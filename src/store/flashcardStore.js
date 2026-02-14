import { create } from "zustand";
import { flashcardService } from "../services/flashcardService";
import { useAuthStore } from "./authStore";

export const useFlashcardStore = create((set, get) => ({
    decks: [],
    generatedCards: [],
    generatedTopic: "",
    loading: false,
    generating: false,
    error: null,

    // Study session state
    currentDeckId: null,
    currentCardIndex: 0,
    studiedCards: [],
    isStudying: false,
    isFlipped: false,

    // --- Deck CRUD ---
    fetchDecks: async () => {
        set({ loading: true, error: null });
        try {
            const data = await flashcardService.getAll();
            set({ decks: Array.isArray(data) ? data : [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || "Failed to fetch decks" });
        }
    },

    generateCards: async (topic, cardCount = 5) => {
        set({ generating: true, error: null, generatedCards: [], generatedTopic: topic });
        try {
            const data = await flashcardService.generate(topic, cardCount);
            // Update credits in auth store
            if (data.credits !== undefined) {
                useAuthStore.getState().setUser({ credits: data.credits });
            }
            set({
                generatedCards: data.flashcards || [],
                generating: false,
            });
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to generate flashcards";
            set({ generating: false, error: message });
            throw new Error(message);
        }
    },

    saveDeck: async (title, cards) => {
        set({ loading: true, error: null });
        try {
            const data = await flashcardService.save(title, cards);
            set((state) => ({
                decks: [...state.decks, data],
                generatedCards: [],
                generatedTopic: "",
                loading: false,
            }));
            return data;
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || "Failed to save deck" });
            throw err;
        }
    },

    updateDeck: async (id, packData) => {
        set({ loading: true, error: null });
        try {
            const data = await flashcardService.update(id, packData);
            set((state) => ({
                decks: state.decks.map((d) => (d._id === id ? { ...d, ...data } : d)),
                loading: false,
            }));
            return data;
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || "Failed to update deck" });
            throw err;
        }
    },

    deleteDeck: async (id) => {
        set({ loading: true, error: null });
        try {
            await flashcardService.remove(id);
            set((state) => ({
                decks: state.decks.filter((d) => d._id !== id),
                loading: false,
            }));
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || "Failed to delete deck" });
            throw err;
        }
    },

    clearGenerated: () => set({ generatedCards: [], generatedTopic: "" }),

    // --- Study Session ---
    startStudy: (deckId) => {
        set({
            currentDeckId: deckId,
            currentCardIndex: 0,
            studiedCards: [],
            isStudying: true,
            isFlipped: false,
        });
    },

    flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),

    nextCard: () => {
        const { currentCardIndex, currentDeckId, decks, studiedCards } = get();
        const deck = decks.find((d) => d._id === currentDeckId);
        if (!deck) return;

        const totalCards = deck.cards.length;
        const newStudied = studiedCards.includes(currentCardIndex)
            ? studiedCards
            : [...studiedCards, currentCardIndex];

        if (currentCardIndex < totalCards - 1) {
            set({
                currentCardIndex: currentCardIndex + 1,
                studiedCards: newStudied,
                isFlipped: false,
            });
        } else {
            // Last card — mark it studied too
            set({ studiedCards: newStudied, isFlipped: false });
        }
    },

    prevCard: () => {
        const { currentCardIndex } = get();
        if (currentCardIndex > 0) {
            set({ currentCardIndex: currentCardIndex - 1, isFlipped: false });
        }
    },

    markStudied: () => {
        const { currentCardIndex, studiedCards } = get();
        if (!studiedCards.includes(currentCardIndex)) {
            set({ studiedCards: [...studiedCards, currentCardIndex] });
        }
    },

    endStudy: () =>
        set({
            currentDeckId: null,
            currentCardIndex: 0,
            studiedCards: [],
            isStudying: false,
            isFlipped: false,
        }),
}));
