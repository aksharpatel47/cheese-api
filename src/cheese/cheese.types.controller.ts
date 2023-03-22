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
@Controller('cheese-types')
export class CheeseTypesController {
  constructor(private cheeseRepository: CheeseRepository) {}

  @Get()
  getAllCheeseTypes() {
    return this.cheeseRepository.findAll();
  }

  @Get(':id')
  getCheeseTypeById(@Param('id') id: string) {
    const intId = parseInt(id);
    return this.cheeseRepository.findOne(intId);
  }

  @Post()
  createCheeseType(@Body() body: any) {
    return this.cheeseRepository.create(body);
  }

  @Put(':id')
  updateCheeseType(@Param('id') id: string, @Body() body: any) {
    const intId = parseInt(id);
    return this.cheeseRepository.update(intId, body);
  }

  @Delete(':id')
  deleteCheeseType(@Param('id') id: string) {
    const intId = parseInt(id);
    return this.cheeseRepository.delete(intId);
  }
}
