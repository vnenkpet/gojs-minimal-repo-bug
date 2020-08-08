import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { AppModule } from 'src/app.module';

describe('Request Controller', () => {
  let controller: RequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = await module.resolve<RequestController>(RequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
