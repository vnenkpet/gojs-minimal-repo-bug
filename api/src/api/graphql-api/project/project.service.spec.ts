import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { AppModule } from 'src/app.module';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = await module.resolve<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
