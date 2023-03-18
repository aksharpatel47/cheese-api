import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('cheeses')
export class CheeseController {
  @Get()
  getCheeses() {
    return 'Get all cheeses';
  }

  @Get('types')
  getCheeseTypes() {
    return 'Get all cheese types';
  }

  @Get(':id')
  getCheeseById() {
    return 'Get cheese by id';
  }

  @Post()
  createCheese() {
    return 'Create a new cheese';
  }

  @Put(':id')
  updateCheese() {
    return 'Update a cheese';
  }

  @Delete(':id')
  deleteCheese() {
    return 'Delete a cheese';
  }
}
