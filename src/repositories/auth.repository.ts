import { UserRepository } from '../user/user.repository';
import { User } from '@prisma/client';

interface IAuthRepository {
  validateUser(email: string, pass: string): Promise<User>;
}

export class AuthRepository implements IAuthRepository {
  constructor(private userRepository: UserRepository) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOne(email);

    if (!user) return null;
    if (user.password !== pass) return null;

    return user;
  }
}
