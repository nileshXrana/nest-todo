import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    createTask(@Body() task: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(task);
    }

    @Get(':userId')
    getTasksbyId(
        @Param('userId') userId: number,
        @Query('page') page: number = 1,  
        @Query('limit') limit: number = 5,
    ): Promise<Task[]> {
        return this.taskService.getTasksbyId(userId, page, limit);
    }
}