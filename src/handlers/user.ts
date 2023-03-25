import { IContext } from '../context';
import { Handler, Request, Response } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

const createUserInput = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export async function createUserHandler(req: Request, res: Response) {
  const input = createUserInput.safeParse(req.body);
  if (!IsSafeParseSuccess(input)) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const user = await req.ctx.repositories.user.create(input.data);
  res.status(201).json(user);
}

/**
 * Get all users in the database.
 * @param ctx
 * @deprecated
 */
export async function getAllUsersHandler(req: Request, res: Response) {
  const users = await req.ctx.repositories.user.findAll();
  res.status(200).json(users);
}
