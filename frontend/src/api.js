import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  signup: (name, email, password) =>
    apiClient.post('/user/signup', { name, email, password }),
  login: (email, password) =>
    apiClient.post('/user/login', { email, password }),
};

export const urlAPI = {
  createShortUrl: (url) =>
    apiClient.post('/url', { url }),
  getUserUrls: () =>
    apiClient.get('/url/user/urls'),
  redirectToUrl: (shortId) =>
    apiClient.get(`/url/${shortId}`),
};

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserToStorage = (user) => localStorage.setItem('user', JSON.stringify(user));
export const removeUserFromStorage = () => localStorage.removeItem('user');
