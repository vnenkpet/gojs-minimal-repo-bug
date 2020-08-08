import { Module } from '@nestjs/common';
import { RequestController } from './request/request.controller';
import { RequestService } from './request/request.service';
import { IdentityModule } from 'src/shared/identity/identity.module';
import { ProjectIdentityGuard } from './project-identity.guard';
import { ProjectModule } from 'src/model/project/project.module';
import { IdentityController } from './identity/identity.controller';

@Module({
  imports: [IdentityModule, ProjectModule],
  controllers: [RequestController, IdentityController],
  providers: [RequestService, ProjectIdentityGuard],
})
export class RestApiModule {}
