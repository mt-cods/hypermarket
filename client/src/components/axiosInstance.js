// utils/axiosInstance.js
import axios from 'axios';
import { API_URL } from '../pages/config';

// Use a way to access context inside the interceptor
let authHandlers = {
  triggerLogin: () => {},
};

export const setAuthInterceptorHandlers = (handlers) => {
  authHandlers = handlers;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authHandlers.triggerLogin?.();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;