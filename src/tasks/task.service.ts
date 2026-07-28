import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './entities/task.entity';
import { Label } from '../labels/entities/label.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(Label)
        private readonly labelRepository: Repository<Label>,
    ) { }

    async createTask(userId: number, createTask: CreateTaskDto): Promise<Task> {

        const newTask = new Task();
        newTask.title = createTask.title;
        newTask.description = createTask.description;
        newTask.status = createTask.status;

        if (createTask.labelIds && createTask.labelIds.length > 0) {
            const labels = await this.labelRepository.findBy({ id: In(createTask.labelIds) });
            newTask.labels = labels;
        } else {
            newTask.labels = [];
        }

        return await this.taskRepository.save(newTask);
    }

    async getTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }
}