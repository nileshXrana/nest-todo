import { IsString, IsNotEmpty, MinLength, IsArray, IsOptional, IsInt, IsBoolean } from 'class-validator';

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

    @IsBoolean()
    @IsOptional()
    checked?: boolean;

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    labelIds?: number[];
}

export class UpdateTaskDto {

    @IsString()
    @IsOptional()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    status?: TaskStatus;

    @IsBoolean()
    @IsOptional()
    checked?: boolean;

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    labelIds?: number[];
}