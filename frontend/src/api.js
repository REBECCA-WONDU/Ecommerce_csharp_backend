import axios from 'axios';

const API_BASE_URL = 'http://localhost:5085/api'; // Updated port from launchSettings.json

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);

export const getCategories = () => api.get('/categories');
export const createCategory = (category) => api.post('/categories', category);

export default api;
