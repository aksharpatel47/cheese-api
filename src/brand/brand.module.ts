import { Module } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { BrandController } from './brand.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from '../common/common.module';
import { CheeseModule } from '../cheese/cheese.module';

@Module({
  imports: [AuthModule, CommonModule, CheeseModule],
  providers: [BrandRepository],
  controllers: [BrandController],
})
export class BrandModule {}
