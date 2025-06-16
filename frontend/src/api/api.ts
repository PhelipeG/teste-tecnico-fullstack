import axios from 'axios';
import type { Product } from '../@types/Product';


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};
