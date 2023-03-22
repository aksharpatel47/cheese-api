import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CheeseRepository } from './cheese.repository';
import { LocalAuthGuard } from '../auth/auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('cheeses')
export class CheeseController {
  constructor(private cheeseRepository: CheeseRepository) {}

  @Get()
  getCheeses() {
    return this.cheeseRepository.findAll();
  }

  @Get(':id')
  getCheeseById(@Param('id') id: string) {
    const intId = parseInt(id);
    return this.cheeseRepository.findOne(intId);
  }

  @Post()
  createCheese(@Body() body: any) {
    return this.cheeseRepository.create(body);
  }

  @Put(':id')
  updateCheese(@Param('id') id: string, @Body() body: any) {
    const intId = parseInt(id);
    return this.cheeseRepository.update(intId, body);
  }

  @Delete(':id')
  deleteCheese(@Param('id') id: string) {
    const intId = parseInt(id);
    return this.cheeseRepository.delete(intId);
  }
}
