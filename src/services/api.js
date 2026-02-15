import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const baseURLString = import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: `${baseURLString}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
