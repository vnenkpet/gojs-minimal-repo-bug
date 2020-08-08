import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

const collection: UserEntity[] = [];

export class UserEntity {
  id: string;
  email: string;
  name: string;
  password: string; // todo: hash
}

@Injectable()
export class UserRepoService {
  async create(userData: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const user: UserEntity = { ...userData, id: v4() };
    collection.push(user);
    return user;
  }
}
