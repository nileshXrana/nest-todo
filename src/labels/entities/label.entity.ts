import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    label: string;
}
