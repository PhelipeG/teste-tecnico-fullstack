import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product, ProductsService } from './products.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //metodo get chamando service
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Produtos listados com sucesso.' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Buscar por nome ou descrição',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filtrar por categoria',
  })
  @ApiQuery({
    name: 'provider',
    required: false,
    description: 'Filtrar por fornecedor (brazilian/european)',
  })
  @ApiQuery({
    name: 'department',
    required: false,
    description: 'Filtrar por departamento',
  })
  @ApiQuery({
    name: 'material',
    required: false,
    description: 'Filtrar por material',
  })
  async findAllProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('provider') provider?: string,
    @Query('department') department?: string,
    @Query('material') material?: string,
  ): Promise<Product[]> {
    return this.productsService.getAllProducts({
      search,
      category,
      provider,
      department,
      material,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async findProductById(@Param('id') id: string): Promise<Product | undefined> {
    return this.productsService.getProductById(id);
  }
}
