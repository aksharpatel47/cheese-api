import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommonProviders } from '../common/common.providers';

@Injectable()
export class UserService {
  constructor(@Inject(CommonProviders.DB) private DB: PrismaClient) {}

  async findOne(email: string) {
    return this.DB.user.findUnique({
      where: {
        email,
      },
    });
  }
}
