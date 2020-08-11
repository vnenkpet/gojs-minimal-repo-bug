import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RestApiModule } from './api/rest-api/rest-api.module';
import { GraphqlApiModule } from './api/graphql-api/graphql-api.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    RestApiModule,
    GraphqlApiModule,
    GraphQLModule.forRoot({ autoSchemaFile: true, cors: true }),
  ],
  controllers: [AppController],
})
export class AppModule {}
