import { PrismaClient } from '@prisma/client';
import { NewRepositories } from './repositories/repositories';
import { NewServices } from './services/services';
import * as express from 'express';
import { Application } from 'express';
import { createContext, IContext } from './context';
import { registerRoutes } from './routes';
import * as process from 'process';
import passport from 'passport';
import { Strategy } from 'passport-jwt';

export function setupApi(): Application {
  const app = express();
  //
  // passport.use(
  //   new Strategy({
  //     issuer: 'https://aksharpatel47.com',
  //     secretOrKey: process.env.TOKEN_SECRET,
  //     audience: 'https://veg-cheese.aksharpatel47.com',
  //   }),
  //   (payload, done) => {
  //     context.repositories.user.findOne();
  //   },
  // );

  registerRoutes(app, createContext());

  // Graceful shutdown
  process.on('SIGTERM', () => process.exit());

  return app;
}
