import { Prisma, PrismaClient } from '@prisma/client';

export class BrandRepository {
  constructor(private DB: PrismaClient) {}

  findOne(id: number) {
    return this.DB.brand.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll() {
    return this.DB.brand.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  create(data: Prisma.BrandCreateInput) {
    return this.DB.brand.create({
      data,
    });
  }

  update(id: number, data: Prisma.BrandUpdateInput) {
    return this.DB.brand.update({
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
    return this.DB.brand.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
