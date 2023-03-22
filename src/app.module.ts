import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheeseModule } from './cheese/cheese.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BrandRepository } from './brand/brand.repository';
import { CommonModule } from './common/common.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [CheeseModule, UserModule, AuthModule, CommonModule, BrandModule],
  controllers: [AppController],
  providers: [AppService, BrandRepository],
})
export class AppModule {}
