import { Controller, Get, Param } from '@nestjs/common';
import { Product, ProductsService } from './products.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //metodo get chamando service
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Produtos listados com sucesso.' })
  async findAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async findProductById(@Param('id') id: string): Promise<Product | undefined> {
    return this.productsService.getProductById(id);
  }
}
