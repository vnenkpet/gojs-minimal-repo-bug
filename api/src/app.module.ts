import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RestApiModule } from './api/rest-api/rest-api.module';
import { GraphqlApiModule } from './api/graphql-api/graphql-api.module';
import { IdentityModule } from './shared/identity/identity.module';
import { ProjectModule } from './model/project/project.module';
import { UserModule } from './model/user/user.module';

@Module({
  imports: [
    RestApiModule,
    GraphqlApiModule,
    ProjectModule,
    IdentityModule,
    ProjectModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
