import { IContext } from '../context';
import { Handler, RequestHandler } from 'express';
import { z } from 'zod';
import { IsSafeParseSuccess } from '../utils';

/**
 * Handler to get all the cheeses.
 * TODO: Add pagination to this endpoint
 * @param ctx
 */
export function getAllCheesesHandler(ctx: IContext): Handler {
  return async (req, res) => {
    const cheeses = await ctx.repositories.cheese.findAll();
    res.status(200).json(cheeses);
  };
}

export function getCheeseByIdHandler(ctx: IContext): Handler {
  return async (req, res) => {
    const intId = parseInt(req.params.id, 10);
    const cheese = await ctx.repositories.cheese.findOne(intId);
    if (!cheese) {
      return res.status(404).json({
        message: 'Cheese not found',
      });
    }
    res.status(200).json(cheese);
  };
}

const createCheeseInput = z
  .object({
    name: z.string(),
    url: z.string().url(),
    brandId: z.number(),
    cheeseTypeIds: z.number().array(),
  })
  .required();

export function createCheeseHandler(
  ctx: IContext,
): RequestHandler<any, any, z.infer<typeof createCheeseInput>, any> {
  return async (req, res) => {
    const input = createCheeseInput.safeParse(req.body);
    if (!IsSafeParseSuccess(input)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const cheese = await ctx.repositories.cheese.create(
      input.data.brandId,
      {
        name: input.data.name,
        url: input.data.url,
      },
      input.data.cheeseTypeIds,
    );

    res.status(201).json(cheese);
  };
}

const updateCheeseInput = z
  .object({
    name: z.string(),
    url: z.string().url(),
    brandId: z.number(),
    cheeseTypeIds: z.number().array(),
  })
  .required();

export function updateCheeseHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const input = updateCheeseInput.safeParse(req.body);
    if (!IsSafeParseSuccess(input)) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const intId = parseInt(req.params.id, 10);
    const cheese = await ctx.repositories.cheese.update(
      intId,
      input.data.brandId,
      {
        name: input.data.name,
        url: input.data.url,
      },
      input.data.cheeseTypeIds,
    );

    res.status(200).json(cheese);
  };
}

export function deleteCheeseHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const intId = parseInt(req.params.id, 10);
    await ctx.repositories.cheese.delete(intId);
    res.status(204).end();
  };
}
