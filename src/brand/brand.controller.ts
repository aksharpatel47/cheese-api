import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { CheeseRepository } from '../cheese/cheese.repository';
import { LocalAuthGuard } from '../auth/auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('brand')
export class BrandController {
  constructor(
    private brandRepository: BrandRepository,
    private cheeseRepository: CheeseRepository,
  ) {}

  @Get()
  getBrands() {
    return this.brandRepository.findAll();
  }

  @Get(':id/cheeses')
  getCheesesByBrand(@Param('id') id: string) {
    const intId = parseInt(id);
    return this.cheeseRepository.findAllByBrandId(intId);
  }

  @Post()
  createBrand(@Body() body: any) {
    return this.brandRepository.create(body);
  }

  @Put(':id')
  updateBrand(@Param('id') id: string, @Body() body: any) {
    const intId = parseInt(id);
    return this.brandRepository.update(intId, body);
  }
}
