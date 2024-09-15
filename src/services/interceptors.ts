//filename: interceptors.ts

import axios from 'axios';

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://localhost:8000/api/refresh-token', {
          refresh_token: refreshToken,
        });

        localStorage.setItem('access_token', response.data.access_token);
        apiClient.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors (e.g., redirect to login)
        console.error('Refresh token error:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
