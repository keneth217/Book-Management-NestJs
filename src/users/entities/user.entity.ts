import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  userName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  phone: string;
}
