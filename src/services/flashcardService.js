import api from './api';

export const flashcardService = {
    generate: async (topic, cardCount) => {
        const { data } = await api.post('/flashcards/generate', { topic, cardCount });
        return data;
    },

    save: async (title, cards) => {
        const { data } = await api.post('/flashcards/save', { title, cards });
        return data;
    },

    getAll: async () => {
        const { data } = await api.get('/flashcards/');
        return data;
    },

    update: async (id, packData) => {
        const { data } = await api.put(`/flashcards/${id}`, packData);
        return data;
    },

    remove: async (id) => {
        const { data } = await api.delete(`/flashcards/${id}`);
        return data;
    },
};
