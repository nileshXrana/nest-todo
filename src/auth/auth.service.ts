
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(
        createUser: CreateUserDto
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.createUser(createUser);
        const payload = { id: user.id, name: user.name, email: user.email };
        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
