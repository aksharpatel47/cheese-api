import {
  CheeseAndCheeseTypesDbTable,
  CheeseDbTable,
  CheeseTypeDbTable,
  ICheeseDto,
  ICheeseInput,
  ICheeseWithBrandDto,
} from '../models/cheese';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { BrandDbTable } from '../models/brand';
import { and, eq, isNull } from 'drizzle-orm/expressions';

export interface ICheeseRepository {
  findOne(id: number): Promise<ICheeseWithBrandDto | null>;

  findAll(): Promise<ICheeseWithBrandDto[]>;

  findAllByBrandId(brandId: number): Promise<ICheeseDto[]>;

  create(
    brandId: number,
    data: ICheeseInput,
    cheeseTypes: number[],
  ): Promise<ICheeseDto>;

  update(
    id: number,
    brandId: number,
    data: { name: string; url: string },
    cheeseTypes: number[],
  ): Promise<void>;

  delete(id: number): Promise<void>;
}

const cheeseWithBrandTableFields = {
  id: CheeseDbTable.id,
  name: CheeseDbTable.name,
  description: CheeseDbTable.description,
  url: CheeseDbTable.url,
  brand: {
    id: BrandDbTable.id,
    name: BrandDbTable.name,
    description: BrandDbTable.description,
    url: BrandDbTable.url,
  },
  createdAt: CheeseDbTable.createdAt,
  updatedAt: CheeseDbTable.updatedAt,
};

const cheeseTableFields = {
  id: CheeseDbTable.id,
  name: CheeseDbTable.name,
  description: CheeseDbTable.description,
  url: CheeseDbTable.url,
  createdAt: CheeseDbTable.createdAt,
  updatedAt: CheeseDbTable.updatedAt,
  brandId: CheeseDbTable.brandId,
};

export class CheeseRepository implements ICheeseRepository {
  constructor(private DB: NodePgDatabase) {}

  async findOne(id: number): Promise<ICheeseWithBrandDto | null> {
    const results = await this.DB.select(cheeseWithBrandTableFields)
      .from(CheeseDbTable)
      .innerJoin(BrandDbTable, eq(CheeseDbTable.brandId, BrandDbTable.id))
      .where(and(eq(CheeseDbTable.id, id), isNull(CheeseDbTable.deletedAt)));

    return results.length > 0 ? results[0] : null;
  }

  findAll() {
    return this.DB.select(cheeseWithBrandTableFields)
      .from(CheeseDbTable)
      .innerJoin(BrandDbTable, eq(CheeseDbTable.brandId, BrandDbTable.id))
      .where(isNull(CheeseDbTable.deletedAt));
  }

  /**
   * Find all cheeses by brand id
   * @param brandId
   */
  findAllByBrandId(brandId: number) {
    return this.DB.select(cheeseTableFields)
      .from(CheeseDbTable)
      .where(
        and(
          eq(CheeseDbTable.brandId, brandId),
          isNull(CheeseDbTable.deletedAt),
        ),
      );
  }

  async create(brandId: number, data: ICheeseInput, cheeseTypes: number[]) {
    const result = await this.DB.insert(CheeseDbTable)
      .values({
        ...data,
        brandId,
      })
      .returning(cheeseTableFields);

    const newCheeseTypes = cheeseTypes.map((c) => ({
      cheeseId: result[0].id,
      cheeseTypeId: c,
    }));

    await this.DB.insert(CheeseAndCheeseTypesDbTable).values(newCheeseTypes);

    return result[0];
  }

  async update(
    id: number,
    brandId: number,
    data: ICheeseInput,
    cheeseTypes: number[],
  ) {
    await this.DB.delete(CheeseAndCheeseTypesDbTable).where(
      eq(CheeseAndCheeseTypesDbTable.cheeseId, id),
    );
    await this.DB.update(CheeseDbTable).set({
      ...data,
    });
    const newCheeseTypes = cheeseTypes.map((c) => ({
      cheeseId: id,
      cheeseTypeId: c,
    }));
    await this.DB.insert(CheeseAndCheeseTypesDbTable).values(newCheeseTypes);
  }

  async delete(id: number) {
    await this.DB.delete(CheeseAndCheeseTypesDbTable).where(
      eq(CheeseAndCheeseTypesDbTable.cheeseId, id),
    );
  }
}
