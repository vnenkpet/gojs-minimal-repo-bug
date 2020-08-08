import { Test, TestingModule } from '@nestjs/testing';
import { ProjectIdentityService } from './project-identity.service';

describe('ProjectIdentityService', () => {
  let service: ProjectIdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectIdentityService],
    }).compile();

    service = await module.resolve<ProjectIdentityService>(
      ProjectIdentityService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
