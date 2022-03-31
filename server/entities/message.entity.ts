import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatroom: number;

  @Column()
  time: number;

  @Column()
  userID: number;

  @Column()
  content: string;

  @OneToOne(() => User, (user) => user.email)
  users: User[];
}
