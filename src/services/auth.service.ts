import { User } from '@prisma/client';
import { IUserRepository } from '../repositories/user.repository';

export interface IAuthService {
  validateUser(email: string, pass: string): Promise<User | null>;
}

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOne(email);

    if (!user) return null;
    if (user.password !== pass) return null;

    return user;
  }
}
