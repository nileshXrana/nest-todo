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

    async signIn(email: string, pass: string): Promise<any> {

        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }


        const payload = { id: user.id, email: user.email };
        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        };

    }

    async signUp(name: string, email: string, pass: string): Promise<any> {
        const newUser = await this.usersService.createUser({ name, email, password: pass });
        return { id: newUser.id, email: newUser.email };
    }
}
