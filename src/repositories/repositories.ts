import { IUserRepository, UserRepository } from './user.repository';
import { BrandRepository, IBrandRepository } from './brand.repository';
import { CheeseRepository, ICheeseRepository } from './cheese.repository';
import {
  CheeseTypeRepository,
  ICheeseTypeRepository,
} from './cheese-type.repository';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface IRepositories {
  user: IUserRepository;
  brand: IBrandRepository;
  cheese: ICheeseRepository;
  cheeseType: ICheeseTypeRepository;
}

export function NewRepositories(DB: NodePgDatabase): IRepositories {
  return {
    user: new UserRepository(DB),
    brand: new BrandRepository(DB),
    cheese: new CheeseRepository(DB),
    cheeseType: new CheeseTypeRepository(DB),
  };
}
