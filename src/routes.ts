import * as bodyParser from 'body-parser';
import { IContext } from './context';
import { Application } from 'express';
import { getHealthHandler } from './handlers/health';
import { createUserHandler, getAllUsersHandler } from './handlers/user';
import { loginHandler, signupHandler } from './handlers/auth';
import {
  createCheeseHandler,
  deleteCheeseHandler,
  getAllCheesesHandler,
  getCheeseByIdHandler,
  updateCheeseHandler,
} from './handlers/cheese';
import {
  createBrandHandler,
  deleteBrandHandler,
  getAllBrandsHandler,
  getBrandByIdHandler,
  updateBrandHandler,
} from './handlers/brand';

export function registerRoutes(app: Application, ctx: IContext) {
  // middlewares
  app.use(bodyParser.json());
  // health route
  app.get('/health', getHealthHandler(ctx));
  // auth route
  app.post('/auth/token', loginHandler(ctx));
  app.post('/auth/refresh', loginHandler(ctx));
  app.post('/auth', signupHandler(ctx));
  // user routes
  app.post('/users', createUserHandler(ctx));
  app.get('/users', getAllUsersHandler(ctx));
  // cheese routes
  app.get('/cheeses', getAllCheesesHandler(ctx));
  app.get('/cheeses/:id', getCheeseByIdHandler(ctx));
  app.post('/cheeses', createCheeseHandler(ctx));
  app.put('/cheeses/:id', updateCheeseHandler(ctx));
  app.delete('/cheeses/:id', deleteCheeseHandler(ctx));
  // brand routes
  app.get('/brands', getAllBrandsHandler(ctx));
  app.get('/brands/:id', getBrandByIdHandler(ctx));
  app.post('/brands', createBrandHandler(ctx));
  app.put('/brands/:id', updateBrandHandler(ctx));
  app.delete('/brands/:id', deleteBrandHandler(ctx));
}
