import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GoogleDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  picture: string;
}
