import { IUserRepository } from '../repositories/user.repository';

export interface IAuthResponse {
  token: string;
  refreshToken: string;
}

export interface IAuthService {
  validateUser(email: string, pass: string): Promise<IAuthResponse | null>;
  refreshToken(refreshToken: string): Promise<IAuthResponse | null>;
}

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.getUserWithPassword(email);

    if (!user) return null;
    if (user.password !== pass) return null;

    const response: IAuthResponse = {
      token: 'token',
      refreshToken: '',
    };

    return response;
  }

  async refreshToken(refreshToken: string) {
    const response: IAuthResponse = {
      token: 'token',
      refreshToken: '',
    };

    return response;
  }
}
