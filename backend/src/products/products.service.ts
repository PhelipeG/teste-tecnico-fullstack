import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import axios from 'axios';

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
}

export interface ProductFilters {
  search?: string;
  category?: string;
  provider?: string;
  department?: string;
  material?: string;
}

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
  discountValue?: string;
  gallery: string[];
  details: {
    adjective?: string;
    material: string;
  };
  category?: string;
  department?: string;
}

@Injectable()
export class ProductsService {
  private brazilianURL =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeanURL =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  //mapeando api brasileira
  private mapBrazilianProduct(item: ApiProductBR): Product {
    return {
      id: item.id,
      name: item.nome,
      description: item.descricao,
      price: item.preco,
      category: item.categoria,
      image: item.imagem,
      material: item.material,
      department: item.departamento,
      provider: 'brazilian',
    };
  }
  //mapeando api europeia
  private mapEuropeanProduct(item: ApiProductEU): Product {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category ?? '',
      image: item.gallery?.[0] ?? '', // pega a primeira imagem da galeria
      material: item.details?.material ?? '',
      department: item.department ?? '',
      provider: 'european',
    };
  }
  // funcao que retorna os dados das duas api(tipads corretamente)
  async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const [productsBr, productsEu] = await Promise.all([
        axios.get<ApiProductBR[]>(this.brazilianURL),
        axios.get<ApiProductEU[]>(this.europeanURL),
      ]);
      const brProducts: Product[] = productsBr.data.map((item) =>
        this.mapBrazilianProduct(item),
      );
      const euProducts: Product[] = productsEu.data.map((item) =>
        this.mapEuropeanProduct(item),
      );
      let allProducts = [...brProducts, ...euProducts];

      // Aplicar filtros se fornecidos
      if (filters) {
        allProducts = this.applyFilters(allProducts, filters);
      }

      return allProducts;
    } catch (error) {
      throw new BadGatewayException(
        'Erro ao buscar produtos das APIs externas',
        error,
      );
    }
  }

  private applyFilters(
    products: Product[],
    filters: ProductFilters,
  ): Product[] {
    let filteredProducts = products; // inicializa com todos os produtos
    const { search, category, provider, department, material } = filters;

    // Filtro de busca (nome ou descrição)
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.trim().toLowerCase().includes(searchTerm) ||
          product.description.trim().toLowerCase().includes(searchTerm),
      );
    }

    // Filtro por categoria
    if (category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase()),
      );
    }

    // Filtro por fornecedor
    if (provider) {
      filteredProducts = filteredProducts.filter(
        (product) => product.provider === provider,
      );
    }

    // Filtro por departamento
    if (department) {
      filteredProducts = filteredProducts.filter((product) =>
        product.department.toLowerCase().includes(department.toLowerCase()),
      );
    }

    // Filtro por material
    if (material) {
      filteredProducts = filteredProducts.filter((product) =>
        product.material.toLowerCase().includes(material.toLowerCase()),
      );
    }

    return filteredProducts;
  }
  //pega todos os produtos unificados e busca o id nessa lista
  async getProductById(id: string): Promise<Product> {
    try {
      const products = await this.getAllProducts();
      const product = products.find((product) => product.id === id);

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
}
