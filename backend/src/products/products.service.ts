import { Injectable, NotFoundException } from '@nestjs/common';
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
  // recebe os dois endpoints de produtos
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
  async getAllProducts(): Promise<Product[]> {
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
    return [...brProducts, ...euProducts];
  }
  //pega todos os produtos unificados e busca o id nessa lista
  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const products = await this.getAllProducts();
      const productId = products.find((product) => product.id === id);
      if (!productId) {
        throw new Error('Produto não encontrado');
      }
      return productId;
    } catch (error) {
      // Se já for uma exceção HTTP, apenas relança
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Produto não encontrado');
    }
  }
}
