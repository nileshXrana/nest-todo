import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUser: CreateUserDto): Promise<User> {
        const exists = await this.userRepository.findOne({ where: { email: createUser.email } });
        if (exists) {
            throw new ConflictException("User already registered");
        }

        const newUser: User = new User();
        newUser.name = createUser.name;
        newUser.email = createUser.email;
        newUser.password = createUser.password;
        return await this.userRepository.save(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async getUsers(): Promise<User[]> {
        const users: User[] = await this.userRepository.find();
        return users;
    }
}