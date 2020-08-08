import { ProjectIdentityGuard } from './project-identity.guard';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('ProjectIdentityGuard', () => {
  let guard: ProjectIdentityGuard;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    guard = await module.resolve<ProjectIdentityGuard>(ProjectIdentityGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
