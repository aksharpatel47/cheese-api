import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CheeseTypeDbTable, ICheeseInput, ICheeseType } from '../models/cheese';
import { and, eq, isNull } from 'drizzle-orm/expressions';

export interface ICheeseTypeRepository {
  findOne(id: number): Promise<ICheeseType | null>;

  findAll(): Promise<ICheeseType[]>;

  create(data: ICheeseInput): Promise<ICheeseType>;

  update(id: number, data: ICheeseInput): Promise<ICheeseType | null>;

  delete(id: number): Promise<void>;
}

const cheeseTypeTableFields = {
  id: CheeseTypeDbTable.id,
  name: CheeseTypeDbTable.name,
  description: CheeseTypeDbTable.description,
  url: CheeseTypeDbTable.url,
};

export class CheeseTypeRepository implements ICheeseTypeRepository {
  constructor(private DB: NodePgDatabase) {}

  findAll(): Promise<ICheeseType[]> {
    return this.DB.select(cheeseTypeTableFields)
      .from(CheeseTypeDbTable)
      .where(isNull(CheeseTypeDbTable.deletedAt));
  }

  async findOne(id: number) {
    const result = await this.DB.select(cheeseTypeTableFields)
      .from(CheeseTypeDbTable)
      .where(
        and(isNull(CheeseTypeDbTable.deletedAt), eq(CheeseTypeDbTable.id, id)),
      );

    return result.length > 0 ? result[0] : null;
  }

  async create(data: ICheeseInput) {
    const result = await this.DB.insert(CheeseTypeDbTable)
      .values(data)
      .returning(cheeseTypeTableFields);

    return result[0];
  }

  async update(id: number, data: ICheeseInput): Promise<ICheeseType | null> {
    const result = await this.DB.update(CheeseTypeDbTable)
      .set(data)
      .where(
        and(eq(CheeseTypeDbTable.id, id), isNull(CheeseTypeDbTable.deletedAt)),
      )
      .returning(cheeseTypeTableFields);

    return result.length > 0 ? result[0] : null;
  }

  async delete(id: number) {
    await this.DB.update(CheeseTypeDbTable)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(CheeseTypeDbTable.id, id));
  }
}
