// src/books/books.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseGuards(ThrottlerGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(Role.Admin)
  // Only admins can create books
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Roles(Role.User, Role.Admin, Role.Guest)
  // Both users and admins can view the list of books
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  // Both users and admins can view a specific book
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  // Only admins can update a book
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  // Only admins can delete a book
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
