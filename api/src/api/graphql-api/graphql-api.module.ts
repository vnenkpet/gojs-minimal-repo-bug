import { Module } from '@nestjs/common';
import { ProjectResolver } from './project/project.resolver';
import { ProjectService } from './project/project.service';
import { ProjectModule } from 'src/model/project/project.module';
import { IdentityModule } from 'src/shared/identity/identity.module';

@Module({
  imports: [ProjectModule, IdentityModule],
  providers: [ProjectResolver, ProjectService],
})
export class GraphqlApiModule {}
