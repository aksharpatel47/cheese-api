import { Brand, Prisma, PrismaClient } from '@prisma/client';

export interface IBrandRepository {
  findOne(id: number): Promise<Brand | null>;

  findAll(): Promise<Brand[]>;

  create(data: Prisma.BrandCreateInput): Promise<Brand>;

  update(id: number, data: Prisma.BrandUpdateInput): Promise<Brand>;

  delete(id: number): Promise<void>;
}

export class BrandRepository implements IBrandRepository {
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

  async delete(id: number) {
    await this.DB.brand.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
