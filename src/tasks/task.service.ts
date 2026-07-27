import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    ) { }

    async createTask(createTask: CreateTaskDto): Promise<Task> {

        const newTask: Task = new Task();
        newTask.userId = createTask.userId;
        newTask.task = createTask.task;
        return await this.taskRepository.save(newTask);

    }

    async getTasksbyId(userId: number, page: number, limit: number): Promise<Task[]> {

        const tasks: Task[] = await this.taskRepository.find({
            where: { userId: userId },
            skip: (page - 1) * limit,
            take: limit
        });
        return tasks;


    }

}