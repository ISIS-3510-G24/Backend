import { Controller, Post, Get, Param, Body } from '@nestjs/common';
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
    async getUserById(@Param('id') id: number): Promise<User | null> {
        return this.usersService.getUserById(id);
    }
}