import { Cheese, Prisma, PrismaClient } from '@prisma/client';

export interface ICheeseRepository {
  findOne(id: number): Promise<Cheese | null>;
  findAll(): Promise<Cheese[]>;
  findAllByBrandId(brandId: number): Promise<Cheese[]>;
  create(data: Prisma.CheeseCreateInput): Promise<Cheese>;
  update(id: number, data: Prisma.CheeseUpdateInput): Promise<Cheese>;
  delete(id: number): Promise<void>;
}

export class CheeseRepository implements ICheeseRepository {
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

  async delete(id: number) {
    await this.DB.cheese.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
