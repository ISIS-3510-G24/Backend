import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShoppingBagService } from './shopping_bag.service';
import { ShoppingBag } from './shopping_bag.model';

@Controller('shopping-bag')
export class ShoppingBagController {
    constructor(private readonly shoppingBagService: ShoppingBagService) {}
    
        @Post()
        async createShoppingBag(@Body() shoppingBag: ShoppingBag): Promise<void> {
            await this.shoppingBagService.createShoppingBag(shoppingBag);
        }
    
        @Get(':id')
        async getShoppingBagById(@Param('id') id: string): Promise<ShoppingBag | null> {
            return this.shoppingBagService.getShoppingBagById(id);
        }
    
        @Put(':id')
        async updateShoppingBag(@Param('id') id: string, @Body() data: Partial<ShoppingBag>): Promise<void> {
            await this.shoppingBagService.updateShoppingBag(id, data);
        }

        @Put(':id/order/:orderId')
        async linkBagToOrder(@Param('id') bagId: string, @Param('orderId') orderId: string): Promise<void> {
            await this.shoppingBagService.linkBagToOrder(bagId, orderId);
        }
        
    
        @Delete(':id')
        async deleteShoppingBag(@Param('id') id: string): Promise<void> {
            await this.shoppingBagService.deleteShoppingBag(id);
        }

        @Delete(':id/order')
        async unlinkBagFromOrder(@Param('id') bagId: string): Promise<void> {
            await this.shoppingBagService.unlinkBagFromOrder(bagId);
        }
    
        @Put(':id/product/:productId')
        async linkShoppingToProduct(@Param('id') shoppingId: string, @Param('productId') productId: string): Promise<void> {
            await this.shoppingBagService.linkShoppingToProduct(shoppingId, productId);
        }
    
        @Delete(':id/product')
        async unlinkShoppingFromProduct(@Param('id') shoppingId: string): Promise<void> {
            await this.shoppingBagService.unlinkShoppingFromProduct(shoppingId);
        }
    
        @Put(':id/user/:userId')
        async addShoppingToUser(@Param('id') shoppingId: string, @Param('userId') userId: string): Promise<void> {
            await this.shoppingBagService.addShoppingToUser(userId, shoppingId);
        }
    
        @Delete(':id/user/:userId')
        async removeShoppingFromUser(@Param('id') shoppingId: string, @Param('userId') userId: string): Promise<void> {
            await this.shoppingBagService.removeShoppingFromUser(userId, shoppingId);
        }

        @Put(':id/order/:orderId')
        async addShoppingToOrder(@Param('id') shoppingId: string, @Param('orderId') orderId: string): Promise<void> {
            await this.shoppingBagService.addShoppingToOrder(orderId, shoppingId);
        }
    
        @Delete(':id/order/:orderId')
        async removeShoppingFromOrder(@Param('id') shoppingId: string, @Param('orderId') orderId: string): Promise<void> {
            await this.shoppingBagService.removeShoppingFromOrder(orderId, shoppingId);
        }
}
