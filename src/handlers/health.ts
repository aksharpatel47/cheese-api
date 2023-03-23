import { Request, Response } from 'express';
import { IContext } from '../context';

export function getHealthHandler(ctx: IContext) {
  return (req: Request, res: Response) => {
    res.status(200).send('Ok');
  };
}
