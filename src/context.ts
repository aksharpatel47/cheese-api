import { PrismaClient } from '@prisma/client';
import { IRepositories, NewRepositories } from './repositories/repositories';
import { IServices, NewServices } from './services/services';

export interface IContext {
  db: PrismaClient;
  repositories: IRepositories;
  services: IServices;
}

export function createContext(): IContext {
  const db = new PrismaClient();
  const repositories = NewRepositories(db);
  const services = NewServices(repositories);

  return {
    db,
    repositories,
    services,
  };
}
