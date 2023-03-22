import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthRepository } from './auth.repository';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthRepository) {
    super();
  }

  async validate(email: string, password: string) {
    console.log('validate', email, password);

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
