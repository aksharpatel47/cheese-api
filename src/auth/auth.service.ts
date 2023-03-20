import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private userService: UserRepository) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (!user) return null;
    if (user.password !== pass) return null;

    return user;
  }
}
