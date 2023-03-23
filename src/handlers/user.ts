import { IContext } from '../context';
import { Handler } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

const createUserInput = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export function createUserHandler(ctx: IContext): Handler {
  return async (req, res) => {
    const userInput = createUserInput.safeParse(req.body);
    if (!IsSafeParseSuccess(userInput)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: userInput.error.issues,
      });
    }

    const user = await ctx.repositories.user.create(userInput.data);
    res.status(201).json(user);
  };
}

// TODO: Delete this handler
export function getAllUsersHandler(ctx: IContext): Handler {
  return async (req, res) => {
    const users = await ctx.repositories.user.findAll();
    res.status(200).json(users);
  };
}
