import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(createUser: CreateUserDto): Promise<{ access_token: string }> {
        let user = await this.usersService.findByEmail(createUser.email);
        if (!user) {
            user = await this.usersService.createUser(createUser);
        } else if (user.password !== createUser.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, name: user.name, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
