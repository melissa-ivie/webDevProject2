import { Project } from 'server/entities/project.entity';
import { User } from 'server/entities/user.entity';

export class CreateTaskDto {
  title: string;
  timeEstimation: string;
  description: string;
  status: string;
  assignee: string;
  assignedUser: User;
  projectID: number;
  project: Project;
}
