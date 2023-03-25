import { Request, Response } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

export async function getAllCheeseTypesHandler(req: Request, res: Response) {
  const cheeseTypes = await req.ctx.repositories.cheeseType.findAll();
  res.status(200).json(cheeseTypes);
}

const cheeseTypeInput = z.object({
  name: z.string(),
  url: z.string().url(),
});

export async function createCheeseTypeHandler(req: Request, res: Response) {
  const input = cheeseTypeInput.safeParse(req.body);
  if (!IsSafeParseSuccess(input)) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const cheese = await req.ctx.repositories.cheeseType.create(input.data);
  res.json(cheese);
}

export async function updateCheeseTypeHandler(req: Request, res: Response) {
  const input = cheeseTypeInput.safeParse(req.body);
  if (!IsSafeParseSuccess(input)) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const intId = parseInt(req.params.id, 10);
  const cheese = await req.ctx.repositories.cheeseType.update(
    intId,
    input.data,
  );
  res.json(cheese);
}

export async function deleteCheeseTypeHandler(req: Request, res: Response) {
  const intId = parseInt(req.params.id, 10);
  await req.ctx.repositories.cheeseType.delete(intId);
  res.status(204).end();
}
