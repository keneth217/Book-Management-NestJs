import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
} from '@nestjs/common';
import { PoemsaiService } from './poemsai.service';
import { CreatePoemsaiDto } from './dto/create-poemsai.dto';
import { UpdatePoemsaiDto } from './dto/update-poemsai.dto';

@Controller('poemsai')
export class PoemsaiController {
  constructor(private readonly poemsaiService: PoemsaiService) {}
  @SetMetadata('isPublic', true)
  @Post('generate')
  async generatePoem(@Body() createPoemsaiDto: CreatePoemsaiDto) {
    try {
      const poem = await this.poemsaiService.generatePoem(
        createPoemsaiDto.description,
      );
      return { poem }; // Return the generated poem as response
    } catch (error) {
      return { error: error.message }; // Return the error message if something goes wrong
    }
  }
  @Post()
  create(@Body() createPoemsaiDto: CreatePoemsaiDto) {
    return this.poemsaiService.create(createPoemsaiDto);
  }

  @Get()
  findAll() {
    return this.poemsaiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poemsaiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoemsaiDto: UpdatePoemsaiDto) {
    return this.poemsaiService.update(+id, updatePoemsaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poemsaiService.remove(+id);
  }
}
