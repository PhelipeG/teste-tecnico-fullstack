import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Product,
  ProductFilters,
  ProductsService,
  PaginatedResponse,
} from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar produtos com paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos com informações de paginação',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Quantidade de itens por página',
  })
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
  async getAllProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('provider') provider?: string,
    @Query('department') department?: string,
    @Query('material') material?: string,
  ): Promise<PaginatedResponse> {
    const filters: ProductFilters = {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      category,
      provider: provider as 'brazilian' | 'european',
      department,
      material,
    };
    return this.productsService.getAllProducts(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }
}
