import {
  IUserDto,
  IUserInput,
  IUserWithPassword,
  UserDbTable,
} from '../models/user';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm/expressions';

export interface IUserRepository {
  getUserWithPassword(email: string): Promise<IUserWithPassword | null>;

  findById(id: number): Promise<IUserDto | null>;

  create(data: IUserInput, refreshToken: string): Promise<IUserDto>;
}

export class UserRepository implements IUserRepository {
  constructor(private DB: NodePgDatabase) {}

  async getUserWithPassword(email: string): Promise<IUserWithPassword | null> {
    const result = await this.DB.select({
      id: UserDbTable.id,
      name: UserDbTable.name,
      email: UserDbTable.email,
      password: UserDbTable.password,
    })
      .from(UserDbTable)
      .where(eq(UserDbTable.email, email));

    return result.length > 0 ? result[0] : null;
  }

  async findById(id: number): Promise<IUserDto | null> {
    const results = await this.DB.select({
      id: UserDbTable.id,
      name: UserDbTable.name,
      email: UserDbTable.email,
    })
      .from(UserDbTable)
      .where(eq(UserDbTable.id, id));

    return results.length > 0 ? results[0] : null;
  }

  async create(data: IUserInput, refreshToken: string): Promise<IUserDto> {
    const results = await this.DB.insert(UserDbTable)
      .values({
        ...data,
        refreshToken,
      })
      .returning();

    return results[0];
  }
}
