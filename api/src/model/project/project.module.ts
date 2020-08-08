import { Module } from '@nestjs/common';
import { ProjectRepoService } from './project-repo/project-repo.service';
import { IdentityModule } from 'src/shared/identity/identity.module';

@Module({
  imports: [IdentityModule],
  providers: [ProjectRepoService],
  exports: [ProjectRepoService],
})
export class ProjectModule {}
