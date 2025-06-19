import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import axios from 'axios';

// Interfaces para os produtos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  material: string;
  department: string;
  provider: 'brazilian' | 'european';
  quantity?: number;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  provider?: 'brazilian' | 'european';
  department?: string;
  material?: string;
}

export interface PaginatedResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Interfaces das APIs externas
interface ApiProductBR {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  categoria: string;
  imagem: string;
  material: string;
  departamento: string;
}

interface ApiProductEU {
  id: string;
  name: string;
  description: string;
  price: string;
  gallery: string[];
  details: { material: string };
  category?: string;
  department?: string;
}

@Injectable()
export class ProductsService {
  private readonly BRAZILIAN_API =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private readonly EUROPEAN_API =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';
  private readonly DEFAULT_LIMIT = 12;

  async getAllProducts(filters?: ProductFilters): Promise<PaginatedResponse> {
    try {
      const [brazilianData, europeanData] = await Promise.all([
        axios.get<ApiProductBR[]>(this.BRAZILIAN_API),
        axios.get<ApiProductEU[]>(this.EUROPEAN_API),
      ]);
      const allProducts = [
        ...brazilianData.data.map(this.mapBrazilianProduct),
        ...europeanData.data.map(this.mapEuropeanProduct),
      ];

      // Aplicar filtros
      const filteredProducts = this.applyFilters(allProducts, filters);

      const shouldPaginate = filters?.page || filters?.limit;

      if (!shouldPaginate) {
        return {
          products: filteredProducts,
          totalPages: 1,
          currentPage: 1,
          totalItems: filteredProducts.length,
          hasNext: false,
          hasPrev: false,
        };
      }

      // Aplicar paginação apenas quando especificado
      return this.paginate(filteredProducts, filters);
    } catch {
      throw new BadGatewayException(
        'Erro ao buscar produtos das APIs externas',
      );
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await this.getAllProducts({ limit: 1000 });
      const product = response.products.find((p) => p.id === id);

      if (!product) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadGatewayException('Erro ao buscar produto');
    }
  }

  // Mapear produto brasileiro para formato padrão
  private mapBrazilianProduct = (item: ApiProductBR): Product => ({
    id: item.id,
    name: item.nome,
    description: item.descricao,
    price: item.preco,
    category: item.categoria,
    image: item.imagem,
    material: item.material,
    department: item.departamento,
    provider: 'brazilian',
  });

  // Mapear produto europeu para formato padrão
  private mapEuropeanProduct = (item: ApiProductEU): Product => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category || '',
    image: item.gallery?.[0] || '',
    material: item.details?.material || '',
    department: item.department || '',
    provider: 'european',
  });
  private applyFilters(
    products: Product[],
    filters?: ProductFilters,
  ): Product[] {
    if (!filters) return products;

    return products.filter((product) => {
      // Filtro de busca por nome ou descrição
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Filtros
      if (
        filters.category &&
        !product.category.toLowerCase().includes(filters.category.toLowerCase())
      ) {
        return false;
      }
      if (filters.provider && product.provider !== filters.provider) {
        return false;
      }
      if (
        filters.department &&
        !product.department
          .toLowerCase()
          .includes(filters.department.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.material &&
        !product.material.toLowerCase().includes(filters.material.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }
  private paginate(
    products: Product[],
    filters?: ProductFilters,
  ): PaginatedResponse {
    const page = filters?.page || 1;
    const limit = filters?.limit || this.DEFAULT_LIMIT;
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / limit);

    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      totalPages,
      currentPage: page,
      totalItems,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}
