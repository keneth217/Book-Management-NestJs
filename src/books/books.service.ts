import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Check if a book with the same title already exists
    const existingBook = await this.booksRepository.findOne({
      where: { title: createBookDto.title },
    });

    if (existingBook) {
      throw new BadRequestException(
        `A book with the title "${createBookDto.title}" already exists.`,
      );
    }
    const newBook = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id); // Ensure the book exists
    const updatedBook = Object.assign(book, updateBookDto);
    return this.booksRepository.save(updatedBook);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id); // Ensure the book exists
    await this.booksRepository.remove(book);
  }

  // Assign a book to a user
  async giveBook(bookId: string, userId: string): Promise<Book> {
    // Fetch the book by its ID
    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Check if the book is already borrowed
    if (book.isBorrowed) {
      throw new BadRequestException(
        `Book with ID ${bookId} is already borrowed by another user`,
      );
    }

    // Fetch the user by their ID
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Set the book as borrowed and assign the user
    book.isBorrowed = true; // Mark the book as borrowed
    book.borrowedBy = user; // Assign the book to the user
    book.borrowDate = new Date(); // Set current date as borrow date
    book.returnDate = null; // No return date until returned

    // Save the updated book record to the database
    return this.booksRepository.save(book);
  }

  // List books borrowed by a specific user
  async listBooksForUser(userId: string): Promise<Book[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['books'], // Fetch related books
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.booksRepository.find({ where: { borrowedBy: user } }); // Return books borrowed by the user
  }

  // Return a book from a user
  async returnBook(bookId: string, userId: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['borrowedBy'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (!book.borrowedBy || book.borrowedBy.id !== userId) {
      throw new BadRequestException(
        `Book with ID ${bookId} is not borrowed by user with ID ${userId}`,
      );
    }

    book.isBorrowed = false; // Mark book as returned
    book.borrowedBy = null; // Unassign the user
    book.returnDate = new Date();
    return this.booksRepository.save(book);
  }

  async listAllBorrowedBooks(): Promise<Book[]> {
    try {
      console.log('Fetching borrowed books...');
      const books = await this.booksRepository.find({
        where: { isBorrowed: true }, // Query borrowed books
        relations: ['borrowedBy'], // Include borrower details
      });

      if (books.length === 0) {
        throw new NotFoundException('No books are currently borrowed');
      }

      return books;
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      throw error; // Re-throw error after logging it
    }
  }

  async searchBookByAuthorTitleGenre(
    title: string,
    author: string,
    genre: string,
  ): Promise<Book[]> {
    try {
      const queryBuilder = this.booksRepository.createQueryBuilder('book');

      if (title) {
        queryBuilder.andWhere('book.title ILIKE :title', {
          title: `%${title}%`,
        });
      }
      if (author) {
        queryBuilder.andWhere('book.author ILIKE :author', {
          author: `%${author}%`,
        });
      }
      if (genre) {
        queryBuilder.andWhere('book.genre ILIKE :genre', {
          genre: `%${genre}%`,
        });
      }

      // Execute the query and return results
      const books = await queryBuilder.getMany();

      if (books.length === 0) {
        throw new NotFoundException(
          'No books found for the given search criteria',
        );
      }

      return books;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error; // Re-throw error after logging
    }
  }
}
