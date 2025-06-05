import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allows cookies to be sent with requests (important for authentication)
});

export default api;
