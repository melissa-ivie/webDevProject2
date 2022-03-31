import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'server/entities/user.entity';
import { SessionsController } from '../controllers/sessions.controller';
import { UsersController } from 'server/controllers/users.controller';
import { UsersService } from '../providers/services/users.service';
import { RefreshTokensService } from '../providers/services/refresh_tokens.service';
import { RefreshToken } from 'server/entities/refresh_token.entity';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensController } from 'server/controllers/refresh_tokens.controller';
import { Role } from 'server/entities/role.entity';
import { Chatroom } from 'server/entities/chatroom.entity';
import { ChatroomsService } from 'server/providers/services/chatrooms.service';
import { ChatroomsController } from 'server/controllers/chatrooms.controller';
import { RolesService } from 'server/providers/services/roles.service';
import { UserRole } from 'server/entities/user_role.entity';
import { Message } from 'server/entities/message.entity';
import { MessagesService } from 'server/providers/services/messages.service';
import { MessagesController } from 'server/controllers/messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Role, UserRole, Chatroom, Message])],
  controllers: [SessionsController, UsersController, RefreshTokensController, ChatroomsController, MessagesController],
  providers: [UsersService, RolesService, RefreshTokensService, JwtService, ChatroomsService, MessagesService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
