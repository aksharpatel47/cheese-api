import * as express from 'express';
import { Application } from 'express';
import { createContext } from './context';
import { registerRoutes } from './routes';
import * as process from 'process';

export function setupApi(): Application {
  const app = express();
  registerRoutes(app, createContext());

  // Graceful shutdown
  process.on('SIGTERM', () => process.exit());

  return app;
}
