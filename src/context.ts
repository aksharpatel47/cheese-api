import { PrismaClient } from '@prisma/client';
import { IRepositories, NewRepositories } from './repositories/repositories';
import { IServices, NewServices } from './services/services';

export interface IContext {
  repositories: IRepositories;
  services: IServices;
}

export function createContext(): IContext {
  const db = new PrismaClient();
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
      findAll: jest.fn(),
      findById: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
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
