import { Test, TestingModule } from '@nestjs/testing';
import { IdentityController } from './identity.controller';
import { AppModule } from 'src/app.module';

describe('Identity Controller', () => {
  let controller: IdentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = await module.resolve<IdentityController>(IdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
