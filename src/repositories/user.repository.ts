import { PrismaClient } from '@prisma/client';

export class UserRepository {
  constructor(private DB: PrismaClient) {}

  async findOne(email: string) {
    return this.DB.user.findUnique({
      where: {
        email,
      },
    });
  }
}
