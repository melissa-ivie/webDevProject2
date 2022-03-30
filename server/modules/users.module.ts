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
import { Project } from 'server/entities/project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { ProjectsController } from 'server/controllers/projects.controller';
import { RolesService } from 'server/providers/services/roles.service';
import { UserRole } from 'server/entities/user_role.entity';
import { Task } from 'server/entities/task.entity';
import { TasksService } from 'server/providers/services/tasks.service';
import { TasksController } from 'server/controllers/tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Role, UserRole, Project, Task])],
  controllers: [SessionsController, UsersController, RefreshTokensController, ProjectsController, TasksController],
  providers: [UsersService, RolesService, RefreshTokensService, JwtService, ProjectsService, TasksService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
