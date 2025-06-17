import axios from 'axios';
import type { Product } from '../@types/Product';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

export interface PaginatedResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}
export interface CreateOrderRequest {
  name: string;
  email: string;
  items: Product[];
  totalPrice: number;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  items: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}

export const getProducts = async (
  page?: number,
  limit?: number,
  filters?: {
    search?: string;
    category?: string;
    provider?: string;
    department?: string;
    material?: string;
  }
): Promise<PaginatedResponse> => {
  const params = new URLSearchParams();
  
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (filters?.search) params.append('search', filters.search);
  if (filters?.category) params.append('category', filters.category);
  if (filters?.provider) params.append('provider', filters.provider);
  if (filters?.department) params.append('department', filters.department);
  if (filters?.material) params.append('material', filters.material);

  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

// Função para buscar todos os produtos sem paginação
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await getProducts();
  return response.products;
};
export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao criar pedido');
    }
    throw new Error('Erro inesperado ao criar pedido');
  }
};
// Função para buscar pedidos
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar pedidos');
    }
    throw new Error('Erro inesperado ao buscar pedidos');
  }
};