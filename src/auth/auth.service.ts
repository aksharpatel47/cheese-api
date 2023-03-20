import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (!user) return null;
    if (user.password !== pass) return null;

    return user;
  }
}
