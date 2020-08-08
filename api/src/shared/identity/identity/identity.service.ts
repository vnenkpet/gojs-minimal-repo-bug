import { Injectable, Scope } from '@nestjs/common';
import { UserEntity } from 'src/model/user/user-repo/user-repo.service';

@Injectable({ scope: Scope.REQUEST })
export class IdentityService {
  private _user: UserEntity;

  set user(user: UserEntity) {
    this._user = user;
  }

  get user(): UserEntity {
    return this._user;
  }
}
