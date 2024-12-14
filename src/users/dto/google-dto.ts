import { IsEmail, IsNotEmpty } from 'class-validator';

export class GoogleDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
