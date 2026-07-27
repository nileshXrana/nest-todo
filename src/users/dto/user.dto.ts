import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsNotEmpty()
    password: string;

}