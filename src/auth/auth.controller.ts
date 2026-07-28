
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: SignInDto): Promise<any> {
    return this.authService.signIn(user.email, user.password);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.signUp(user.name, user.email, user.password);
  }

}