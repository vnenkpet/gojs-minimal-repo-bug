import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRepoService } from './project-repo.service';
import { AppModule } from 'src/app.module';

describe('ProjectRepoService', () => {
  let service: ProjectRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = await module.resolve<ProjectRepoService>(ProjectRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
