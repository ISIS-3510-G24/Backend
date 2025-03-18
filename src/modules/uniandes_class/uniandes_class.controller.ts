import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UniandesClassService } from './uniandes_class.service';
import { UniandesClass } from './uniandes_class.model';

@Controller('uniandes_classes')
export class UniandesClassController {
    constructor(private readonly UniandesClassService: UniandesClassService) { }

    @Post()
    async createUniandesClass(@Body() uniandes_Class: UniandesClass): Promise<void> {
        return this.UniandesClassService.createUniandesClass(uniandes_Class);
    }

    @Get(':id')
    async getClassById(@Param('id') id: string): Promise<UniandesClass | null> {
        return this.UniandesClassService.getUniandesClassById(id);
    }

    @Put(':id')
    async updateClass(@Param('id') id: string, @Body() data: Partial<UniandesClass>): Promise<void> {
        return this.UniandesClassService.updateUniandesClass(id, data);
    }

    @Delete(':id')
    async deleteClass(@Param('id') id: string): Promise<void> {
        return this.UniandesClassService.deleteClass(id);
    }

    @Put(':id/product/:productId')
    async addProductToClass(@Param('id') classId: string, @Param('productId') productId: string): Promise<void> {
        return this.UniandesClassService.addProductToClass(classId, productId);
    }

    @Delete(':id/product/:productId')
    async removeProductFromClass(@Param('id') classId: string, @Param('productId') productId: string): Promise<void> {
        return this.UniandesClassService.removeProductFromClass(classId, productId);
    }

    @Get(':id/products')
    async getProductsByClass(@Param('id') classId: string): Promise<any> {
        return this.UniandesClassService.getProductsByClass(classId);
    }

    @Get('/product/:productId')
    async getClassesByProduct(@Param('productId') productId: string): Promise<any> {
        return this.UniandesClassService.getClassesByProduct(productId);
    }
}