import { IUserRepository, UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';
import { BrandRepository, IBrandRepository } from './brand.repository';
import { CheeseRepository, ICheeseRepository } from './cheese.repository';
import {
  CheeseTypeRepository,
  ICheeseTypeRepository,
} from './cheese-type.repository';

export interface IRepositories {
  user: IUserRepository;
  brand: IBrandRepository;
  cheese: ICheeseRepository;
  cheeseType: ICheeseTypeRepository;
}

export function NewRepositories(DB: PrismaClient): IRepositories {
  return {
    user: new UserRepository(DB),
    brand: new BrandRepository(DB),
    cheese: new CheeseRepository(DB),
    cheeseType: new CheeseTypeRepository(DB),
  };
}
