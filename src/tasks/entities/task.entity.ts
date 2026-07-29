import { Column, Entity, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Label } from '../../labels/entities/label.entity';
import { TaskStatus } from '../dto/task.dto';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'enum', enum: ['Working', 'Pending', 'Completed'] })
    status: string;

    @Column({ type: 'boolean', default: false })
    checked: boolean;

    // relationships
    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @JoinTable()
    @ManyToMany(() => Label, (label) => label.tasks)
    labels: Label[];
}