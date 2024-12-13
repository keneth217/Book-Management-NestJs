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
  NotFoundException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Book } from './entities/book.entity'; // Import Throttle correctly

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard, ThrottlerGuard) // Combine all guards in one @UseGuards decorator
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles('admin') // Only Admin role can create books
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('all') // Limit to 10 requests per minute
  @Roles('user', 'admin', 'guest') // Roles that can view the list of books
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Roles('user', 'admin') // Both users and admins can view a specific book
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin') // Only Admin can update a book
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @Roles('admin') // Only Admin can delete a book
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
  @Patch(':bookId/assign/:userId')
  async giveBook(
    @Param('bookId') bookId: string,
    @Param('userId') userId: string,
  ) {
    return this.booksService.giveBook(bookId, userId);
  }

  @Get('user/:userId')
  async listBooksForUser(@Param('userId') userId: string) {
    return this.booksService.listBooksForUser(userId);
  }

  @Post('borrowed') // This maps to the URL http://localhost:4000/api/books/all
  async listBooksBorrowed(): Promise<Book[]> {
    console.log('Fetching borrowed books...');
    try {
      // Call the service method to fetch borrowed books
      const borrowedBooks = await this.booksService.listAllBorrowedBooks();
      console.log('Borrowed Books:', borrowedBooks);
      return borrowedBooks;
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      throw new NotFoundException('No borrowed books found');
    }
  }

  @Patch(':bookId/return/:userId')
  async returnBook(
    @Param('bookId') bookId: string,
    @Param('userId') userId: string,
  ) {
    return this.booksService.returnBook(bookId, userId);
  }

  @Post('search')
  async searchBooks(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('genre') genre?: string,
  ): Promise<Book[]> {
    console.log('Searching for books with:', { title, author, genre });
    return this.booksService.searchBookByAuthorTitleGenre(title, author, genre);
  }
}
