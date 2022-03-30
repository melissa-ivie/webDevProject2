import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, Column } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectLeaderID: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  userEmails: string[];

  @ManyToMany(() => User, (user) => user.email)
  users: User[];

  @OneToMany(() => Task, (task) => task.id)
  tasks: Task[];
}
