import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Skip } from 'server/decorators/skip.decorator';
import { CreateProjectDto } from 'server/dto/create_project.dto';
import { Project } from 'server/entities/project.entity';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { ProjectsService } from 'server/providers/services/projects.service';

@Controller()
export class ProjectsController {
  constructor(
    private projectService: ProjectsService,
  ) {}

  @Get('/projects')
  async index() {
    const projects = await this.projectService.findAll();
    return { projects };
  }

  @Get('/projectID')
  async getCurrentProject(@Body() projectBody: Project){
    const projectID = await this.projectService.find(projectBody.id);
    return { projectID };
  }

  @Post('/project')
  @Skip(AuthGuard)
  async create(@Body() body: CreateProjectDto, @Res({ passthrough: true }) res: Response) {
    const newProject = new Project();
    newProject.title = body.title;
    newProject.projectLeaderID = body.projectLeaderID;
    newProject.userEmails = body.users;
    
    try {
      const project = await this.projectService.create(newProject);
      return { project };
    } catch (e) {
      throw new HttpException(`Project creation failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
