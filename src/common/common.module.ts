import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommonProviders } from './common.providers';

@Module({
  providers: [
    {
      provide: CommonProviders.DB,
      useValue: new PrismaClient(),
    },
  ],
  exports: [CommonProviders.DB],
})
export class CommonModule {}
