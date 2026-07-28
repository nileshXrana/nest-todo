import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { Label } from '../labels/entities/label.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Label])],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule { }