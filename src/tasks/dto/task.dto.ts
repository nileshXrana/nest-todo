import { IsString, IsNotEmpty, MinLength, IsArray, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    labelIds?: number[];
}