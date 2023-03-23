import { IContext } from '../context';
import { RequestHandler } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

const loginInput = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export function loginHandler(
  ctx: IContext,
): RequestHandler<any, any, z.infer<typeof loginInput>> {
  return async (req, res) => {
    const input = loginInput.safeParse(req.body);
    if (!IsSafeParseSuccess(input)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const user = await ctx.services.auth.validateUser(
      input.data.email,
      input.data.password,
    );

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    res.status(200).json('Authenticated.');
  };
}

const signupInput = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export function signupHandler(
  ctx: IContext,
): RequestHandler<any, any, z.infer<typeof signupInput>> {
  return async (req, res) => {
    const input = signupInput.safeParse(req.body);
    if (!IsSafeParseSuccess(input)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    await ctx.repositories.user.create(input.data);
    res.status(201).send('CREATED!');
  };
}
