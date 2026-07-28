import { Controller, Post, Body, Get, Query, UseGuards, Request, Headers } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '../auth/auth.guard';
import { title } from 'process';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    createTask(@Request() req: any, @Body() task: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(Number(req.headers['user_id']), task);
    }

    @Get()
    getTasks(
        // @Request() req: any,
        // @Query('page') page: number = 1,
        // @Query('limit') limit: number = 5,
    ): Promise<Task[]> {
        return this.taskService.getTasks();
    }
}