import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
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
        newTask.userId = userId;
        newTask.title = createTask.title;
        newTask.description = createTask.description;
        newTask.status = createTask.status;
        newTask.checked = createTask.checked ?? false;

        if (createTask.labelIds && createTask.labelIds.length > 0) {
            const labels = await this.labelRepository.findBy({ id: In(createTask.labelIds) });
            newTask.labels = labels;
        } else {
            newTask.labels = [];
        }

        return await this.taskRepository.save(newTask);
    }

    async getTasks(userId: number): Promise<Task[]> {
        return await this.taskRepository.find({
            where: { userId },
            relations: { labels: true },
        });
    }

    async updateTask(userId: number, id: number, updateDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id, userId } });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        if (updateDto.title !== undefined) task.title = updateDto.title;
        if (updateDto.description !== undefined) task.description = updateDto.description;
        if (updateDto.status !== undefined) task.status = updateDto.status;
        if (updateDto.checked !== undefined) task.checked = updateDto.checked;
        if (updateDto.labelIds !== undefined) {
            if (updateDto.labelIds.length > 0) {
                const labels = await this.labelRepository.findBy({ id: In(updateDto.labelIds) });
                task.labels = labels;
            } else {
                task.labels = [];
            }
        }
        return await this.taskRepository.save(task);
    }

    async deleteTask(userId: number, id: number): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId });
        if (result.affected === 0) {
            throw new NotFoundException('Task not found');
        }
    }
}