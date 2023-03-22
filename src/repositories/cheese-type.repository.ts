import { Prisma, PrismaClient } from '@prisma/client';

export class CheeseTypeRepository {
  constructor(private DB: PrismaClient) {}

  findAll() {
    return this.DB.cheeseType.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return this.DB.cheeseType.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create(data: Prisma.CheeseTypeCreateInput) {
    return this.DB.cheeseType.create({
      data,
    });
  }

  update(id: number, data: Prisma.CheeseTypeUpdateInput) {
    return this.DB.cheeseType.update({
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
    return this.DB.cheeseType.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
