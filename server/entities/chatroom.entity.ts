import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  userEmails: string[];

  @ManyToMany(() => User, (user) => user.email)
  users: User[];
}
