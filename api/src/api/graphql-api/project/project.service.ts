import { Injectable } from '@nestjs/common';
import { ProjectRepoService } from 'src/model/project/project-repo/project-repo.service';
import { ProjectDto } from 'src/api/rest-api/request/dto/project.dto';
import { Project, ProjectInputData } from './project.resolver';
import { ProjectIdentityService } from 'src/shared/identity/project-identity/project-identity.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepoService,
    private readonly projectIdentity: ProjectIdentityService,
  ) {}

  async create(data: ProjectInputData): Promise<Project> {
    return this.projectRepo.create(data);
  }

  async getCurrentProject(): Promise<Project> {
    return this.projectIdentity.project;
  }

  async getMyProjects(): Promise<Project[]> {
    return [];
  }
}
