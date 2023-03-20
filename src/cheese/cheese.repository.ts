import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CommonProviders } from '../common/common.providers';

@Injectable()
export class CheeseRepository {
  constructor(@Inject(CommonProviders.DB) private DB: PrismaClient) {}

  findOne(id: number) {
    return this.DB.cheese.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll() {
    return this.DB.cheese.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  create(data: Prisma.CheeseCreateInput) {
    return this.DB.cheese.create({
      data,
    });
  }

  update(id: number, data: Prisma.CheeseUpdateInput) {
    return this.DB.cheese.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  delete(id: number) {
    return this.DB.cheese.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
