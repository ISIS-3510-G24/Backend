import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async createProduct(@Body() product: Product): Promise<void> {
        return this.productsService.createProduct(product);
    }

    @Get(':id')
    async getProductById(@Param('id') id: number): Promise<Product | null> {
        return this.productsService.getProductById(id);
    }
}
