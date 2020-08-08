import { Module } from '@nestjs/common';
import { IdentityService } from './identity/identity.service';
import { ProjectIdentityService } from './project-identity/project-identity.service';

@Module({
  providers: [IdentityService, ProjectIdentityService],
  exports: [IdentityService, ProjectIdentityService],
})
export class IdentityModule {}
