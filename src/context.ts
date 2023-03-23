import { PrismaClient } from '@prisma/client';
import { IRepositories } from './repositories/repositories';
import { IServices } from './services/services';

export interface IContext {
  db: PrismaClient;
  repositories: IRepositories;
  services: IServices;
}
