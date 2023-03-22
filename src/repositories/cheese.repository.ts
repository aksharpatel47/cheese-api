import { Prisma, PrismaClient } from '@prisma/client';

export class CheeseRepository {
  constructor(private DB: PrismaClient) {}

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

  /**
   * Find all cheeses by brand id
   * @param brandId
   */
  findAllByBrandId(brandId: number) {
    return this.DB.cheese.findMany({
      where: {
        brandId,
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
