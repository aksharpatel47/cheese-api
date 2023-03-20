import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { CheeseController } from './cheese.controller';
import { CheeseService } from './cheese.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BrandController, CheeseController],
  providers: [CheeseService],
})
export class CheeseModule {}
