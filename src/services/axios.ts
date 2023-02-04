import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4444',
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
