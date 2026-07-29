import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Label } from './labels/entities/label.entity';

export const AppDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12307080',
    database: 'todo',
    entities: [User, Task, Label],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    seeds: [__dirname + '/seeds/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(AppDataSourceOptions);