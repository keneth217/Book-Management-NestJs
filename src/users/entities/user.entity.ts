import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // Use UUID for primary key
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];
  @OneToMany(() => Book, (book) => book.borrowedBy)
  books: Book[]; // Books borrowed by the user
}
