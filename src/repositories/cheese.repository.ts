import { Cheese, PrismaClient } from '@prisma/client';

export interface ICheeseRepository {
  findOne(id: number): Promise<Cheese | null>;

  findAll(): Promise<Cheese[]>;

  findAllByBrandId(brandId: number): Promise<Cheese[]>;

  create(
    brandId: number,
    data: ICheeseInput,
    cheeseTypes: number[],
  ): Promise<Cheese>;

  update(
    id: number,
    brandId: number,
    data: { name: string; url: string },
    cheeseTypes: number[],
  ): Promise<Cheese>;

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

  create(brandId: number, data: ICheeseInput, cheeseTypes: number[]) {
    return this.DB.cheese.create({
      data: {
        brandId,
        name: data.name,
        url: data.url,
        CheeseAndCheeseTypes: {
          create: cheeseTypes.map((c) => ({ cheeseTypeId: c })),
        },
      },
    });
  }

  async update(
    id: number,
    brandId: number,
    data: ICheeseInput,
    cheeseTypes: number[],
  ) {
    await this.DB.cheeseAndCheeseTypes.deleteMany({
      where: {
        cheeseId: id,
      },
    });

    return this.DB.cheese.update({
      where: {
        id,
      },
      data: {
        ...data,
        CheeseAndCheeseTypes: {
          create: cheeseTypes.map((c) => ({ cheeseTypeId: c })),
        },
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

// models
export interface ICheeseInput {
  name: string;
  url: string;
}
