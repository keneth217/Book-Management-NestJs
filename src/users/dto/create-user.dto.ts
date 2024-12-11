import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(4, 20)
  userName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 50)
  password: string;

  @IsOptional()
  phone?: string;
}
