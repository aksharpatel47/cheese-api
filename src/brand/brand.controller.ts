import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandService } from './brand.repository';

@UseGuards(AuthGuard('local'))
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Get()
  getBrands() {
    return 'Get all brands';
  }

  @Get(':id/cheeses')
  getCheesesByBrand() {
    return 'Get all cheeses by brand';
  }

  @Post()
  createBrand() {
    return 'Create a new brand';
  }

  @Put(':id')
  updateBrand() {
    return 'Update a brand';
  }
}
