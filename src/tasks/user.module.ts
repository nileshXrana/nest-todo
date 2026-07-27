import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule { }