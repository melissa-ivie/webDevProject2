import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  roomkey: string;

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];
}
