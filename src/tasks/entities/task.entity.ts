import { Column, Entity, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Label } from '../../labels/entities/label.entity';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    task: string;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 20 })
    status: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @ManyToMany(() => Label, { eager: true })
    @JoinTable()
    labels: Label[];
}