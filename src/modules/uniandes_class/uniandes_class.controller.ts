import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { Uniandes_ClassService } from './Uniandes_Class.service';
import { Uniandes_Class } from './Uniandes_Class.model';

@Controller('uniandes_Class')
export class Uniandes_ClassController {
    constructor(private readonly uniandes_ClassService: Uniandes_Class) {}

    @Post()
    async createUniandes_Class(@Body() uniandes_Class: Uniandes_Class): Promise<void> {
        return this.uniandes_ClassService.createUniandes_Class(uniandes_Class);
    }

    @Get(':id')
    async getUniandes_ClassById(@Param('id') id: number): Promise<Uniandes_Class | null> {
        return this.uniandes_ClassService.getUniandes_ClassById(id);
    }
}