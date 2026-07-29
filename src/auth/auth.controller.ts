
import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { SignInDto } from './auth.dto';
import * as express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() user: SignInDto,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<any> {
    const result = await this.authService.signIn(user.email, user.password);
    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { message: 'Login successful' };
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<any> {
    await this.authService.signUp(user.name, user.email, user.password);
    return { message: 'Signup successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: express.Response) {
    response.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}