import api from './api';

export const authService = {
    register: async (name, email, password) => {
        const { data } = await api.post('/users/register', { name, email, password });
        return data;
    },

    login: async (email, password) => {
        const { data } = await api.post('/users/login', { email, password });
        return data;
    },

    getProfile: async () => {
        const { data } = await api.get('/users/profile');
        return data;
    },

    updateProfile: async (profileData) => {
        const { data } = await api.put('/users/profile', profileData);
        return data;
    },

    deleteProfile: async () => {
        const { data } = await api.delete('/users/profile');
        return data;
    },
};
