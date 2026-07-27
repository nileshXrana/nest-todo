import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
}