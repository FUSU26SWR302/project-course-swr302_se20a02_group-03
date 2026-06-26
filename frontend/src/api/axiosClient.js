import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5138/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for API request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for API response
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Redirect to login could be handled here or in the component
    }
    // Return structured error message if available
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject(errorMessage);
  }
);

export default axiosClient;
