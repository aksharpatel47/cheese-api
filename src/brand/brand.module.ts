import { Module } from '@nestjs/common';
import { BrandService } from './brand.repository';
import { BrandController } from './brand.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
