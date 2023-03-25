import { Prisma, PrismaClient, User } from '@prisma/client';
import { IUserDto } from '../models/user';

export interface IUserRepository {
  findOne(email: string): Promise<User | null>;

  findById(id: number): Promise<User | null>;

  findAll(): Promise<IUserDto[]>;

  create(data: Prisma.UserCreateInput): Promise<User>;

  update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
}

export class UserRepository implements IUserRepository {
  constructor(private DB: PrismaClient) {}

  findAll(): Promise<IUserDto[]> {
    return this.DB.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.DB.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findOne(email: string) {
    return this.DB.user.findFirst({
      where: {
        email,
        deletedAt: null,
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
