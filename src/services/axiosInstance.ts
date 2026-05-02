import axios, { type InternalAxiosRequestConfig } from 'axios';
import type { RootState } from '../store';

let store: { getState: () => RootState } | null = null;

export const injectStore = (_store: { getState: () => RootState }) => {
  store = _store;
};
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').trim();
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store?.getState()?.auth?.accessToken;

  console.log('TOKEN SENT:', token);
  console.log('REQUEST URL:', config.baseURL, config.url);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
