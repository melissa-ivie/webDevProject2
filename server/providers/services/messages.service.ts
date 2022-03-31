import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'server/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  findAll(relations: string[] = []) {
    return this.messageRepository.find({ relations });
  }

  find(seekid: number) {
    return this.messageRepository.findOne({ id: seekid });
  }

//   update(newid: number, newstatus:string) {
//     return this.messageRepository.update({ id: newid }, { status: newstatus }); // tries to update where quantity is 20...
//     //return this.tasksRepository.update();
//   }

  create(newTask: Message) {
    return this.messageRepository.save(newTask);
  }
}
