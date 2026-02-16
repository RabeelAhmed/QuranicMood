import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    if (error.response?.status === 401) {
      // Optional: Clear token and redirect to login if 401
      // localStorage.removeItem('token');
      // window.location.href = '/login'; 
      // Commented out to avoid aggressive redirects during dev
    }
    return Promise.reject(error);
  }
);

export const getAyahByMood = async (mood) => {
  const response = await api.post('/ayahs/mood', { mood });
  return response.data;
};

export const getFavoriteAyahs = async () => {
  const response = await api.get('/ayahs/favorites');
  return response.data;
};

export const addFavoriteAyah = async (ayah) => {
  const response = await api.post('/ayahs/favorites', { ayah });
  return response.data;
};

export const removeFavoriteAyah = async (id) => {
  const response = await api.delete(`/ayahs/favorites/${id}`);
  return response.data;
};

export default api;