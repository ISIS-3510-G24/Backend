import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async createProduct(@Body() product: Product): Promise<void> {
        return this.productsService.createProduct(product);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product | null> {
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() data: Partial<Product>): Promise<void> {
        return this.productsService.updateProduct(id, data);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.deleteProduct(id);
    }
}
