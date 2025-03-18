import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() order: Order): Promise<void> {
        return this.orderService.createOrder(order);
    }

    @Get(':id')
    async getOrderById(@Param('id') id: number): Promise<Order | null> {
        return this.orderService.getOrderById(id);
    }
}