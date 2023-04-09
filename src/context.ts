import { IRepositories, NewRepositories } from './repositories/repositories';
import { IServices, NewServices } from './services/services';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

export interface IContext {
  repositories: IRepositories;
  services: IServices;
}

export function createContext(): IContext {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool);
  const repositories = NewRepositories(db);
  const services = NewServices(repositories);

  return {
    repositories,
    services,
  };
}

export function createUnitTestContext(): IContext {
  const mockRepositories: IRepositories = {
    user: {
      create: jest.fn(),
      findById: jest.fn(),
      getUserWithPassword: jest.fn(),
    },
    cheeseType: {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    brand: {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    cheese: {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllByBrandId: jest.fn(),
    },
  };

  const services = NewServices(mockRepositories);

  return {
    repositories: mockRepositories,
    services,
  };
}
