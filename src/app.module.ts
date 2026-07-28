import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TaskModule } from './tasks/user.module';
import { AppDataSourceOptions } from './data-source';
import { AuthModule } from './auth/auth.module';
import { LabelModule } from './labels/label.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSourceOptions),
    UserModule,
    TaskModule,
    AuthModule,
    LabelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
