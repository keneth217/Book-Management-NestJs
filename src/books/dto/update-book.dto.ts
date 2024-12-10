import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
export class UpdateBookDto extends PartialType(CreateBookDto) {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  rating: number;
}
