import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Skip } from '../decorators/skip.decorator';
import { MessagesService } from '../providers/services/messages.service';
import { AuthGuard } from '../providers/guards/auth.guard';
import { Message } from '../entities/message.entity';
import { CreateMessagesDto } from '../dto/create_message.dto';
import { Response } from 'express';

@Controller()
export class MessagesController {
  constructor(
    private messageService: MessagesService,
  ) {}

  @Get('/messages')
  async index() {
    const messages = await this.messageService.findAll();
    return { messages };
  }


  @Post('/message')
  @Skip(AuthGuard)
  async create(@Body() body: CreateMessagesDto, @Res({ passthrough: true }) res: Response) {
    const newMessage = new Message();
    newMessage.chatroom = body.chatroom;
    newMessage.userName = body.userName;
    newMessage.content = body.content;

    try {
      const message = await this.messageService.create(newMessage);
      return { message };
    } catch (e) {
      throw new HttpException(`Task creation failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
