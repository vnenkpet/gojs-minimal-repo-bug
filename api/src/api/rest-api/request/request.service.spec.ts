import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { AppModule } from 'src/app.module';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = await module.resolve<RequestService>(RequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
