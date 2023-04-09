import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { BrandDbTable, IBrand, IBrandInput } from '../models/brand';
import { and, eq, isNull } from 'drizzle-orm/expressions';

export interface IBrandRepository {
  findOne(id: number): Promise<IBrand | null>;

  findAll(): Promise<IBrand[]>;

  create(data: IBrandInput): Promise<IBrand>;

  update(id: number, data: IBrandInput): Promise<IBrand>;

  delete(id: number): Promise<void>;
}

const brandColumns = {
  id: BrandDbTable.id,
  name: BrandDbTable.name,
  description: BrandDbTable.description,
  url: BrandDbTable.url,
  createdAt: BrandDbTable.createdAt,
  updatedAt: BrandDbTable.updatedAt,
};

export class BrandRepository implements IBrandRepository {
  constructor(private DB: NodePgDatabase) {}

  async findOne(id: number): Promise<IBrand | null> {
    const results = await this.DB.select(brandColumns)
      .from(BrandDbTable)
      .where(and(eq(BrandDbTable.id, id), isNull(BrandDbTable.deletedAt)));
    return results.length > 0 ? results[0] : null;
  }

  findAll() {
    return this.DB.select(brandColumns)
      .from(BrandDbTable)
      .where(isNull(BrandDbTable.deletedAt));
  }

  async create(data: IBrandInput): Promise<IBrand> {
    const results = await this.DB.insert(BrandDbTable)
      .values(data)
      .returning(brandColumns);
    return results[0];
  }

  async update(id: number, data: IBrandInput): Promise<IBrand> {
    const results = await this.DB.update(BrandDbTable)
      .set(data)
      .where(eq(BrandDbTable.id, id))
      .returning(brandColumns);
    return results[0];
  }

  async delete(id: number) {
    await this.DB.update(BrandDbTable)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(BrandDbTable.id, id));
  }
}
