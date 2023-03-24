import { createBrandHandler } from './brand';

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
});
