import { AuthService, IAuthService } from './auth.service';
import { IRepositories } from '../repositories/repositories';

export interface IServices {
  auth: IAuthService;
}

export function NewServices(repositories: IRepositories): IServices {
  return {
    auth: new AuthService(repositories.user),
  };
}
