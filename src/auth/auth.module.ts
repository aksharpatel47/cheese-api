import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalAuthStrategy } from './local.auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
