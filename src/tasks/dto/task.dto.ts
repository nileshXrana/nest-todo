import { IsString, IsNotEmpty, MinLength, IsArray, IsOptional, IsInt } from 'class-validator';

export type TaskStatus = 'Working' | 'Pending' | 'Completed';

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
    status: TaskStatus;

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    labelIds?: number[];
}