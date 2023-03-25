import { Request, Response } from 'express';
import { z } from 'zod';

/**
 * Handler to get all the cheeses.
 * TODO: Add pagination to this endpoint
 */
export async function getAllCheesesHandler(req: Request, res: Response) {
  const cheeses = await req.ctx.repositories.cheese.findAll();
  res.status(200).json(cheeses);
}

export async function getCheeseByIdHandler(req: Request, res: Response) {
  const intId = parseInt(req.params.id, 10);
  const cheese = await req.ctx.repositories.cheese.findOne(intId);
  if (!cheese) {
    return res.status(404).json({
      message: 'Cheese not found',
    });
  }
  res.status(200).json(cheese);
}

const createCheeseInput = z
  .object({
    name: z.string(),
    url: z.string().url(),
    brandId: z.number(),
    cheeseTypeIds: z.number().array(),
  })
  .required();

export async function createCheeseHandler(req: Request, res: Response) {
  const input = createCheeseInput.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const cheese = await req.ctx.repositories.cheese.create(
    input.data.brandId,
    {
      name: input.data.name,
      url: input.data.url,
    },
    input.data.cheeseTypeIds,
  );

  res.status(201).json(cheese);
}

const updateCheeseInput = z
  .object({
    name: z.string(),
    url: z.string().url(),
    brandId: z.number(),
    cheeseTypeIds: z.number().array(),
  })
  .required();

export async function updateCheeseHandler(req: Request, res: Response) {
  const input = updateCheeseInput.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const intId = parseInt(req.params.id, 10);
  const cheese = await req.ctx.repositories.cheese.update(
    intId,
    input.data.brandId,
    {
      name: input.data.name,
      url: input.data.url,
    },
    input.data.cheeseTypeIds,
  );

  res.status(200).json(cheese);
}

export async function deleteCheeseHandler(req: Request, res: Response) {
  const intId = parseInt(req.params.id, 10);
  await req.ctx.repositories.cheese.delete(intId);
  res.status(204).end();
}
