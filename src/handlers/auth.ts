import { IContext } from '../context';
import { Handler } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

const loginInput = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export function loginHandler(ctx: IContext): Handler {
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
