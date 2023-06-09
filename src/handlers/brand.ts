import { Request, Response } from 'express';
import { BrandInputSchema } from '../models/brand';

export async function getAllBrandsHandler(req: Request, res: Response) {
  const brands = await req.ctx.repositories.brand.findAll();
  res.status(200).json(brands);
}

export async function getBrandByIdHandler(req: Request, res: Response) {
  const intId = parseInt(req.params.id, 10);
  const brand = await req.ctx.repositories.brand.findOne(intId);
  if (!brand) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  res.status(200).json(brand);
}

export async function createBrandHandler(req: Request, res: Response) {
  const input = BrandInputSchema.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const brand = await req.ctx.repositories.brand.create({
    ...input.data,
  });

  res.status(201).json(brand);
}

export async function updateBrandHandler(req: Request, res: Response) {
  const input = BrandInputSchema.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: input.error.issues,
    });
  }

  const intId = parseInt(req.params.id, 10);
  const brand = await req.ctx.repositories.brand.update(intId, {
    ...input.data,
  });

  if (!brand) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  res.status(200).json(brand);
}

export async function deleteBrandHandler(req: Request, res: Response) {
  const intId = parseInt(req.params.id, 10);
  await req.ctx.repositories.brand.delete(intId);

  res.status(204).end();
}
