import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('brand')
export class BrandController {
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
