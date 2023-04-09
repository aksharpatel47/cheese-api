import { Request, Response } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';
import { UserInputSchema, UserWithPasswordSchema } from '../models/user';

const loginInput = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export async function loginHandler(req: Request, res: Response) {
  const input = loginInput.safeParse(req.body);
  if (!IsSafeParseSuccess(input)) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const user = await req.ctx.services.auth.validateUser(
    input.data.email,
    input.data.password,
  );

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  res.status(200).json('Authenticated.');
}

export async function refreshTokenHandler(req: Request, res: Response) {
  const user = await req.ctx.services.auth.refreshToken(req.body.refreshToken);

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  res.status(200).json('Authenticated.');
}

export async function signupHandler(
  req: Request<any, z.infer<typeof UserInputSchema>>,
  res: Response,
) {
  const input = UserInputSchema.safeParse(req.body);
  if (!IsSafeParseSuccess(input)) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  await req.ctx.repositories.user.create(input.data, '');
  res.status(201).send('CREATED!');
}
