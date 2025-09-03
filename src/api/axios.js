import axios from 'axios';

// Get base URL from environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', baseURL); // Add this for debugging

// Create axios instance with default config
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Tenant': 'admin',
    'Branch': '1',
    'Content-Type': 'application/json'
  }
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;