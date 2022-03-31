import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatroom: string;

  @CreateDateColumn()
  time: Date;

  @Column()
  userName: string;

  @Column()
  content: string;

  @OneToOne(() => User, (user) => user.email)
  users: User[];
}
