import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/entities/user.entity';
import { TaskModule } from './tasks/user.module';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12307080',
      entities: [User, Task],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule, TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
