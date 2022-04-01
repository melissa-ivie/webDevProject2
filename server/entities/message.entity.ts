import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatroom: string;

  @Column()
  timeStamp: number;

  @Column()
  userName: string;

  @Column()
  content: string;

  @OneToOne(() => User, (user) => user.email)
  users: User[];
}
