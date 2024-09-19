//filename: interceptors.ts

import axios from 'axios';

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: 'https://afknon.pythonanywhere.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});


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
    console.log(`Error details: ${error.response?.data?.detail}`);
    const originalRequest = error.config;

    // Skip token refresh for login endpoint
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/login')) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('https://afknon.pythonanywhere.com/api/refresh-token', {
          refresh_token: refreshToken,
        });

        localStorage.setItem('access_token', response.data.access_token);
        apiClient.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
