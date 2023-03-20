import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
