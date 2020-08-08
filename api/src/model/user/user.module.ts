import { Module } from '@nestjs/common';
import { UserRepoService } from './user-repo/user-repo.service';

@Module({
  providers: [UserRepoService],
  exports: [UserRepoService],
})
export class UserModule {}
