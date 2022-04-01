import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Skip } from 'server/decorators/skip.decorator';
import { CreateChatroomDto } from 'server/dto/create_chatroom.dto';
import { Chatroom } from 'server/entities/chatroom.entity';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { ChatroomsService } from 'server/providers/services/chatrooms.service';

@Controller()
export class ChatroomsController {
  constructor(
    private chatService: ChatroomsService,
  ) {}

  @Get('/chatrooms')
  async index() {
    const chatrooms = await this.chatService.findAll();
    return { chatrooms };
  }

  @Post('/chatroom')
  @Skip(AuthGuard)
  async create(@Body() body: CreateChatroomDto, @Res({ passthrough: true }) res: Response) {
    const newChatroom = new Chatroom();
    newChatroom.lat = body.lat;
    newChatroom.lon = body.lon;
    newChatroom.title = body.title;
    
    try {
      const chatRoom = await this.chatService.create(newChatroom);
      console.log(chatRoom);
      return { chatRoom };
    } catch (e) {
      throw new HttpException(`Chatroom creation failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
