import { IsString, IsNotEmpty, MinLength, IsInt } from 'class-validator';

export class CreateTaskDto {

    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Task must be at least 3 characters long' })
    task: string;

}