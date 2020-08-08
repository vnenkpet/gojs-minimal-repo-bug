import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ProjectIdentityService } from '../../shared/identity/project-identity/project-identity.service';
import { ProjectRepoService } from 'src/model/project/project-repo/project-repo.service';

@Injectable()
export class ProjectIdentityGuard implements CanActivate {
  constructor(
    private readonly projectIdentity: ProjectIdentityService,
    private readonly projectRepo: ProjectRepoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    try {
      const path = request.path;
      const dsn = path.split('/')[1];
      const project = await this.projectRepo.getByDsn(dsn);
      this.projectIdentity.project = project;
    } catch (e) {
      console.error(e);
      console.log('Could not authenticate.');
      return false;
    }

    return true;
  }
}
