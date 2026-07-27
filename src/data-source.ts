import { User } from "./users/entities/user.entity"
import { Task } from "./tasks/entities/task.entity"

export const AppDataSource = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12307080",
    entities: [User, Task],
    database: "postgres",
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: [],
}