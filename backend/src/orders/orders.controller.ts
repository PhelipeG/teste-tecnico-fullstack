import { Body, Controller, Get, Post } from '@nestjs/common';
import { Order, OrdersService } from './orders.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order-dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() body: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Pedidos retornados com sucesso.' })
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }
}
