import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000, // 30 seconds for review submissions
  withCredentials: true, // Crucial to send/receive JWT cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor to catch expired tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 (Unauthorized/session expired), we can trigger logout state
    if (error.response && error.response.status === 401) {
      console.warn('Authentication token expired or invalid.');
      // Optional: redirect to login if not already there, or clean local session state
    }
    return Promise.reject(error);
  }
);

export default api;
