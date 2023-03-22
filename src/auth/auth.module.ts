import { Module } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { LocalAuthStrategy } from './local.auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'local' })],
  providers: [AuthRepository, LocalAuthStrategy],
  exports: [AuthRepository],
})
export class AuthModule {}
