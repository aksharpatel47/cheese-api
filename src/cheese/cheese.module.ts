import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { CheeseController } from './cheese.controller';
import { CheeseService } from './cheese.service';

@Module({
  controllers: [BrandController, CheeseController],
  providers: [CheeseService],
})
export class CheeseModule {}