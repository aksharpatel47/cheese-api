import { Prisma, PrismaClient, User } from '@prisma/client';

export interface IUserRepository {
  findOne(email: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  create(data: Prisma.UserCreateInput): Promise<User>;

  update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
}

export class UserRepository implements IUserRepository {
  constructor(private DB: PrismaClient) {}

  findAll(): Promise<User[]> {
    return this.DB.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(email: string) {
    return this.DB.user.findUnique({
      where: {
        email,
      },
    });
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.DB.user.create({
      data,
    });
  }

  update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.DB.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }
}
