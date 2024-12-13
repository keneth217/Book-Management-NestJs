import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid') // UUID ensures globally unique identifiers
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column({ type: 'int', name: 'publication_year', nullable: true })
  publicationYear?: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: false }) // Default to false if the book is not borrowed
  isBorrowed: boolean;

  @Column({ type: 'date', nullable: true }) // Store borrow date
  borrowDate: Date;

  @Column({ type: 'date', nullable: true }) // Store return date when the book is returned
  returnDate: Date;

  @ManyToOne(() => User, (user) => user.books, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  borrowedBy: User | null; // User who borrowed the book, or null if not borrowed

  @CreateDateColumn({ type: 'timestamp' }) // Auto-generate the created timestamp
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Auto-generate the updated timestamp
  updatedAt: Date;
}
