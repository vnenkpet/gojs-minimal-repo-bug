import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjectIdentityService } from 'src/shared/identity/project-identity/project-identity.service';
import { ProjectIdentityGuard } from '../project-identity.guard';
import { IProject } from 'src/model/project/interfaces/project.interface';

@UseGuards(ProjectIdentityGuard)
@Controller(':dsn/identity')
export class IdentityController {
  constructor(private readonly projectIdentity: ProjectIdentityService) {}

  @Get()
  async me(): Promise<Omit<IProject, 'dsn'>> {
    const {
      id,
      name,
      createdAt,
      edges,
      nodes,
      users,
      isPublic,
    } = this.projectIdentity.project;
    return { id, name, createdAt, edges, nodes, users, isPublic };
  }
}
