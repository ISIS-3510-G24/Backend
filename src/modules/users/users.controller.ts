import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() user: User): Promise<void> {
        return this.usersService.createUser(user);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Partial<User>): Promise<void> {
        return this.usersService.updateUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}