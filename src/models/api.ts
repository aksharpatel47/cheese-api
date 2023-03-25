import { IContext } from '../context';

export interface IApiRequest extends Request {
  ctx: IContext;
}
