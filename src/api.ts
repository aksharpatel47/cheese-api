import { PrismaClient } from '@prisma/client';
import { NewRepositories } from './repositories/repositories';
import { NewServices } from './services/services';
import * as express from 'express';
import { Application } from 'express';
import { IContext } from './context';
import { registerRoutes } from './routes';
import * as process from 'process';

export function setupApi(): Application {
  const db = new PrismaClient();
  const repositories = NewRepositories(db);
  const services = NewServices(repositories);

  const context: IContext = {
    db,
    repositories,
    services,
  };

  const app = express();

  registerRoutes(app, context);

  // Graceful shutdown
  process.on('SIGTERM', () => process.exit());

  return app;
}
