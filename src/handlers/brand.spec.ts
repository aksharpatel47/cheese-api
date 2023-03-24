import { createBrandHandler } from './brand';
import { Brand } from '@prisma/client';

describe('Create Brand Handler', () => {
  test('should return 400 if input is invalid', async () => {
    const ctx: any = {};

    const handler = createBrandHandler(ctx);
    const req: any = {
      body: {},
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toBeCalled();
  });

  test('should return 201 if input is valid', async () => {
    const brand = {
      id: 1,
      name: 'Brand 1',
      url: 'https://brand1.com',
    };
    const ctx: any = {
      repositories: {
        brand: {
          create: jest.fn().mockResolvedValue(brand),
        },
      },
    };

    const handler = createBrandHandler(ctx);
    const req: any = {
      body: brand,
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toBeCalledWith(brand);
  });
});
