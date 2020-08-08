import { Controller, Post, HttpCode, UseGuards, Param } from '@nestjs/common';
import { ProjectIdentityGuard } from '../project-identity.guard';
import { RequestService } from './request.service';

@UseGuards(ProjectIdentityGuard)
@Controller(':dsn')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('capture/:from/:to')
  @HttpCode(204)
  async post(
    @Param('from') from: string,
    @Param('to') to: string,
  ): Promise<void> {
    return this.requestService.capture({ from, to });
  }
}
