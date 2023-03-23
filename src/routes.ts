import * as bodyParser from 'body-parser';
import { IContext } from './context';
import { Application } from 'express';
import { getHealthHandler } from './handlers/health';
import { createUserHandler, getAllUsersHandler } from './handlers/user';
import { loginHandler } from './handlers/auth';

export function registerRoutes(app: Application, ctx: IContext) {
  // middlewares
  app.use(bodyParser.json());
  // health route
  app.get('/health', getHealthHandler(ctx));
  // auth route
  app.post('/auth', loginHandler(ctx));
  // user routes
  const userRoutes = app.route('/users');
  userRoutes.post(createUserHandler(ctx));
  userRoutes.get(getAllUsersHandler(ctx));
}
