import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allows cookies to be sent with requests (important for authentication)
});

// Add Authorization token from cookies
const token = Cookies.get('accessToken'); // Get token from cookies
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Axios request interceptor to always set the latest token
api.interceptors.request.use(
  (config) => {
    const updatedToken = Cookies.get('accessToken'); // Get latest token
    if (updatedToken) {
      config.headers.Authorization = `Bearer ${updatedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
