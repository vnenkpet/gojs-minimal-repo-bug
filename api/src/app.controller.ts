import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { release: string; graphqlApi: string; restApi: string } {
    return {
      release: process.env.RELEASE ?? 'not tracked',
      graphqlApi: `${process.env.BASE_URL ?? 'http://localhost'}/graphql`,
      restApi: `${process.env.BASE_URL ?? 'http://localhost'}`,
    };
  }
}
