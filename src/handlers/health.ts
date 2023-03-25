import { Request, Response } from 'express';

export async function getHealthHandler(req: Request, res: Response) {
  res.status(200).send('Ok');
}
