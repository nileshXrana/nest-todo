import { Task } from '../../tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

}