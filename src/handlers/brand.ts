import { RequestHandler } from 'express';
import { IContext } from '../context';
import { z } from 'zod';

export function getAllBrandsHandler(ctx: IContext): RequestHandler {
  return async (req, res) => {
    const brands = await ctx.repositories.brand.findAll();
    res.status(200).json(brands);
  };
}

export function getBrandByIdHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const intId = parseInt(req.params.id, 10);
    const brand = await ctx.repositories.brand.findOne(intId);
    if (!brand) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.status(200).json(brand);
  };
}

const createBrandInput = z
  .object({
    name: z.string(),
    url: z.string().url(),
  })
  .required();

export function createBrandHandler(
  ctx: IContext,
): RequestHandler<any, any, z.infer<typeof createBrandInput>, any> {
  return async (req, res) => {
    const input = createBrandInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const brand = await ctx.repositories.brand.create({
      ...input.data,
    });

    res.status(201).json(brand);
  };
}

const updateBrandInput = z.object({
  name: z.string(),
  url: z.string().url(),
});

export function updateBrandHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const input = updateBrandInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: input.error.issues,
      });
    }

    const intId = parseInt(req.params.id, 10);
    const brand = await ctx.repositories.brand.update(intId, {
      ...input.data,
    });

    if (!brand) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.status(200).json(brand);
  };
}

export function deleteBrandHandler(
  ctx: IContext,
): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const intId = parseInt(req.params.id, 10);
    await ctx.repositories.brand.delete(intId);

    res.status(204).end();
  };
}
