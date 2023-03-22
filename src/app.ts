import { PrismaClient } from '@prisma/client';
import { NewRepositories } from './repositories/repositories';

const app = {
  db: new PrismaClient(),
  repositories: NewRepositories,
};
