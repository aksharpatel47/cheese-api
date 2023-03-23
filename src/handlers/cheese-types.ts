import { IContext } from '../context';
import { RequestHandler } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

export function getAllCheeseTypes(ctx: IContext): RequestHandler {
  return async (req, res) => {
    const cheeseTypes = await ctx.repositories.cheeseType.findAll();
    res.json(cheeseTypes);
  };
}

const cheeseTypeInput = z.object({
  name: z.string(),
  url: z.string().url(),
});

export function createCheeseTypeHandler(ctx: IContext): RequestHandler {
  return async (req, res) => {
    const input = cheeseTypeInput.safeParse(req.body);
    if (!IsSafeParseSuccess(input)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const cheese = await ctx.repositories.cheeseType.create(input.data);
    res.json(cheese);
  };
}

export function updateCheeseTypeHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const input = cheeseTypeInput.safeParse(req.body);
    if (!IsSafeParseSuccess(input)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const intId = parseInt(req.params.id, 10);
    const cheese = await ctx.repositories.cheeseType.update(intId, input.data);
    res.json(cheese);
  };
}

export function deleteCheeseTypeHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const intId = parseInt(req.params.id, 10);
    await ctx.repositories.cheeseType.delete(intId);
    res.status(204).end();
  };
}
