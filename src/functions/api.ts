import axios from 'axios';

// Function to get the auth token from localStorage
const getAuthToken = () => {
  const authState = localStorage.getItem('authState');
  if (!authState) return null;
  try {
    const { userID } = JSON.parse(authState);
    return userID ? `Bearer ${userID}` : null;
  } catch (e) {
    return null;
  }
};

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
