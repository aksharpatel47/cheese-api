import * as bodyParser from 'body-parser';
import { IContext } from './context';
import { Application, Router } from 'express';
import { getHealthHandler } from './handlers/health';
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
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export function registerRoutes(app: Application, ctx: IContext) {
  // middlewares
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    // add context to request
    req.ctx = ctx;
    next();
  });

  // setup passport jwt strategy
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        issuer: 'https://aksharpatel47.com',
        secretOrKey: process.env.TOKEN_SECRET,
        audience: 'https://veg-cheese.aksharpatel47.com',
      },
      function (payload, done) {
        ctx.repositories.user.findById(payload.sub).then(
          (user) => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          },
          (err: Error) => done(err, false),
        );
      },
    ),
  );

  // public routes
  // health route
  app.get('/health', getHealthHandler);
  app.post('/auth/token', loginHandler);
  app.post('/auth', signupHandler);

  // authenticated routes
  const authenticatedRouter = Router();
  authenticatedRouter.use(passport.authenticate('jwt', { session: false }));
  app.post('/auth/refresh', loginHandler);
  // cheese routes
  authenticatedRouter.get('/cheeses', getAllCheesesHandler);
  authenticatedRouter.get('/cheeses/:id', getCheeseByIdHandler);
  authenticatedRouter.post('/cheeses', createCheeseHandler);
  authenticatedRouter.put('/cheeses/:id', updateCheeseHandler);
  authenticatedRouter.delete('/cheeses/:id', deleteCheeseHandler);
  // cheese-types routes
  authenticatedRouter.get('/cheese-types', getAllCheeseTypesHandler);
  authenticatedRouter.post('/cheese-types', createCheeseTypeHandler);
  authenticatedRouter.put('/cheese-types/:id', updateCheeseHandler);
  authenticatedRouter.delete('/cheese-types/:id', deleteCheeseHandler);
  // brand routes
  authenticatedRouter.get('/brands', getAllBrandsHandler);
  authenticatedRouter.get('/brands/:id', getBrandByIdHandler);
  authenticatedRouter.post('/brands', createBrandHandler);
  authenticatedRouter.put('/brands/:id', updateBrandHandler);
  authenticatedRouter.delete('/brands/:id', deleteBrandHandler);
}
