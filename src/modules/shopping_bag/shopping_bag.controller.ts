import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShoppingBagService } from './shopping_bag.service';
import { ShoppingBag } from './shopping_bag.model';
@Controller('shopping-bag')
export class ShoppingBagController {
    constructor(private readonly productRequestService: ProductRequestService) {}
    
        @Post()
        async createProductRequest(@Body() productRequest: ProductRequest): Promise<void> {
            await this.productRequestService.createProductRequest(productRequest);
        }
    
        @Get(':id')
        async getProductRequestById(@Param('id') id: string): Promise<ProductRequest> {
            return this.productRequestService.getProductRequestById(id);
        }
    
        @Put(':id')
        async updateProductRequest(@Param('id') id: string, @Body() data: Partial<ProductRequest>): Promise<void> {
            await this.productRequestService.updateProductRequest(id, data);
        }
    
        @Delete(':id')
        async deleteProductRequest(@Param('id') id: string): Promise<void> {
            await this.productRequestService.deleteProductRequest(id);
        }
    
        @Put(':id/product/:productId')
        async linkRequestToProduct(@Param('id') requestId: string, @Param('productId') productId: string): Promise<void> {
            await this.productRequestService.linkRequestToProduct(requestId, productId);
        }
    
        @Delete(':id/product')
        async unlinkRequestFromProduct(@Param('id') requestId: string): Promise<void> {
            await this.productRequestService.unlinkRequestFromProduct(requestId);
        }
    
        @Put(':id/user/:userId')
        async addRequestToUser(@Param('id') requestId: string, @Param('userId') userId: string): Promise<void> {
            await this.productRequestService.addRequestToUser(userId, requestId);
        }
    
        @Delete(':id/user/:userId')
        async removeRequestFromUser(@Param('id') requestId: string, @Param('userId') userId: string): Promise<void> {
            await this.productRequestService.removeRequestFromUser(userId, requestId);
        }
}
