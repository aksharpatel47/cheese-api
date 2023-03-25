import { createBrandHandler } from './brand';
import { createUnitTestContext } from '../context';

describe('Create Brand Handler', () => {
  test('should return 400 if input is invalid', async () => {
    const ctx = createUnitTestContext();

    const req: any = {
      body: {},
      ctx,
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createBrandHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toBeCalled();
  });

  test('should return 201 if input is valid', async () => {
    const brand = {
      id: 1,
      name: 'Brand 1',
      url: 'https://brand1.com',
    };
    const ctx = createUnitTestContext();
    ctx.repositories.brand.create = jest.fn().mockResolvedValue(brand);

    const req: any = {
      body: brand,
      ctx,
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createBrandHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toBeCalledWith(brand);
  });
});
