import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheeseModule } from './cheese/cheese.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BrandService } from './brand/brand.repository';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CheeseModule, UserModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, BrandService],
})
export class AppModule {}
