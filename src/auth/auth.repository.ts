import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthRepository {
  constructor(private userRepository: UserRepository) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOne(email);

    if (!user) return null;
    if (user.password !== pass) return null;

    return user;
  }
}
