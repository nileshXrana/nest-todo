import { Injectable } from '@nestjs/common';
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
    ) {}

    async createTask(userId: number, createTask: CreateTaskDto): Promise<Task> {
        const newTask = new Task();
        newTask.userId = userId;
        newTask.title = createTask.title;
        newTask.description = createTask.description;
        newTask.status = createTask.status;
        newTask.task = createTask.title;

        if (createTask.labelIds && createTask.labelIds.length > 0) {
            const labels = await this.labelRepository.findBy({ id: In(createTask.labelIds) });
            newTask.labels = labels;
        } else {
            newTask.labels = [];
        }

        return await this.taskRepository.save(newTask);
    }

    async getTasks(
        userId: number,
        page: number,
        limit: number,
        filters?: { title?: string; description?: string; status?: string; label?: string; labelId?: number }
    ): Promise<Task[]> {
        const queryBuilder = this.taskRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.userId = :userId', { userId });

        if (filters) {
            if (filters.title) {
                queryBuilder.andWhere('task.title ILIKE :title', { title: `%${filters.title}%` });
            }
            if (filters.description) {
                queryBuilder.andWhere('task.description ILIKE :description', { description: `%${filters.description}%` });
            }
            if (filters.status) {
                queryBuilder.andWhere('task.status = :status', { status: filters.status });
            }
            if (filters.label) {
                queryBuilder.andWhere('label.label ILIKE :label', { label: `%${filters.label}%` });
            }
            if (filters.labelId) {
                queryBuilder.andWhere('label.id = :labelId', { labelId: filters.labelId });
            }
        }

        return await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    }
}