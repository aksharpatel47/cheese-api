import { CheeseType, Prisma, PrismaClient } from '@prisma/client';

export interface ICheeseTypeRepository {
  findOne(id: number): Promise<CheeseType | null>;
  findAll(): Promise<CheeseType[]>;
  create(data: Prisma.CheeseTypeCreateInput): Promise<CheeseType>;
  update(id: number, data: Prisma.CheeseTypeUpdateInput): Promise<CheeseType>;
  delete(id: number): Promise<void>;
}

export class CheeseTypeRepository implements ICheeseTypeRepository {
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

  async delete(id: number) {
    await this.DB.cheeseType.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
