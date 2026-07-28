import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    createTask(@Request() req, @Body() task: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(req.user.id, task);
    }

    @Get()
    getTasks(
        @Request() req,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
        @Query('title') title?: string,
        @Query('description') description?: string,
        @Query('status') status?: string,
        @Query('label') label?: string,
        @Query('labelId') labelId?: number,
    ): Promise<Task[]> {
        return this.taskService.getTasks(req.user.id, Number(page), Number(limit), {
            title,
            description,
            status,
            label,
            labelId: labelId ? Number(labelId) : undefined,
        });
    }
}