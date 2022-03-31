import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Chatroom } from 'server/entities/chatroom.entity'

import { intersection, isEmpty } from 'lodash';

@Injectable()
export class ChatroomsService {
  constructor(
    @InjectRepository(Chatroom)
    private chatroomsRespository: Repository<Chatroom>,
  ) {}

  findAll(relations: string[] = []) {
    return this.chatroomsRespository.find({ relations });
  }

  findBy(options: Record<number, any>) {
    return this.chatroomsRespository.findOne(options);
  }

  create(newChatroom: Chatroom) {
    return this.chatroomsRespository.save(newChatroom);
  }

}
