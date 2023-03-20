import { Module } from '@nestjs/common';
import { CheeseController } from './cheese.controller';
import { CheeseRepository } from './cheese.repository';
import { AuthModule } from '../auth/auth.module';
import { CheeseTypesController } from './cheese.types.controller';
import { CheeseTypesRepository } from './cheese.types.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [AuthModule, CommonModule],
  controllers: [CheeseController, CheeseTypesController],
  providers: [CheeseRepository, CheeseTypesRepository],
})
export class CheeseModule {}
