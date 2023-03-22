import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';
import { BrandRepository } from './brand.repository';
import { CheeseRepository } from './cheese.repository';
import { CheeseTypeRepository } from './cheese-type.repository';

export function NewRepositories(DB: PrismaClient) {
  return {
    user: new UserRepository(DB),
    brand: new BrandRepository(DB),
    cheese: new CheeseRepository(DB),
    cheeseType: new CheeseTypeRepository(DB),
  };
}
