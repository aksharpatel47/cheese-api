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
import {
  createCheeseTypeHandler,
  getAllCheeseTypesHandler,
} from './handlers/cheese-types';

export function registerRoutes(app: Application, ctx: IContext) {
  // middlewares
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    // add context to request
    req.ctx = ctx;
    next();
  });
  // health route
  app.get('/health', getHealthHandler);
  // auth route
  app.post('/auth/token', loginHandler);
  app.post('/auth/refresh', loginHandler);
  app.post('/auth', signupHandler);
  // user routes
  app.post('/users', createUserHandler);
  app.get('/users', getAllUsersHandler);
  // cheese routes
  app.get('/cheeses', getAllCheesesHandler);
  app.get('/cheeses/:id', getCheeseByIdHandler);
  app.post('/cheeses', createCheeseHandler);
  app.put('/cheeses/:id', updateCheeseHandler);
  app.delete('/cheeses/:id', deleteCheeseHandler);
  // cheese-types routes
  app.get('/cheese-types', getAllCheeseTypesHandler);
  app.post('/cheese-types', createCheeseTypeHandler);
  app.put('/cheese-types/:id', updateCheeseHandler);
  app.delete('/cheese-types/:id', deleteCheeseHandler);
  // brand routes
  app.get('/brands', getAllBrandsHandler);
  app.get('/brands/:id', getBrandByIdHandler);
  app.post('/brands', createBrandHandler);
  app.put('/brands/:id', updateBrandHandler);
  app.delete('/brands/:id', deleteBrandHandler);
}
