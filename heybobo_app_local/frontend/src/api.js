import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const api = axios.create({ baseURL: API_URL });

export function setAuth(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem("token", token); // save for refresh
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem("token");
  }
}

// 👉 Initialize auth if token already saved
const saved = localStorage.getItem("token");
if (saved) setAuth(saved);
