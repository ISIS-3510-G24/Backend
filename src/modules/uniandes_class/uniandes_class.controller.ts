import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { Uniandes_ClassService } from './uniandes_class.service';
import { Uniandes_Class } from './uniandes_class.model';

@Controller('uniandes_class')
export class Uniandes_ClassController {
    constructor(private readonly uniandes_ClassService: Uniandes_ClassService) {}

    @Post()
    async createUniandes_Class(@Body() uniandes_Class: Uniandes_Class): Promise<void> {
        return this.uniandes_ClassService.createUniandes_Class(uniandes_Class);
    }

    @Get(':id')
    async getOrderById(@Param('id') id: number): Promise<Uniandes_Class | null> {
        return this.uniandes_ClassService.getUniandes_ClassById(id);
    }
}