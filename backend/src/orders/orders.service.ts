import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Product } from 'src/products/products.service';
import safeParse from 'src/utils/utils';
import { CreateOrderDto } from './dtos/create-order-dto';

export interface Order {
  name: string;
  email: string;
  items: Product[];
  totalPrice: number;
  createdAt: Date;
}
const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = await prisma.order.create({
      data: {
        name: orderDto.name,
        email: orderDto.email,
        items: JSON.stringify(orderDto.items),
        totalPrice: orderDto.totalPrice,
      },
    });
    return {
      ...createdOrder,
      items: safeParse<Product[]>(createdOrder.items) ?? [],
    };
  }
  async findAllOrders(): Promise<Order[]> {
    // buscando as orders em ordem
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return orders.map((order) => ({
      ...order,
      items: safeParse<Product[]>(order.items) ?? [], //usando funcao utilitaria para evitar crash de json invalido
    }));
  }
}
