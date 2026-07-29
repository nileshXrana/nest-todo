import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    createTask(@Request() req: any, @Body() task: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(req.user.id, task);
    }

    @Get()
    getTasks(@Request() req: any): Promise<Task[]> {
        return this.taskService.getTasks(req.user.id);
    }

    @Patch(':id')
    updateTask(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.taskService.updateTask(req.user.id, Number(id), updateTaskDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(
        @Request() req: any,
        @Param('id') id: string,
    ): Promise<void> {
        await this.taskService.deleteTask(req.user.id, Number(id));
    }
}