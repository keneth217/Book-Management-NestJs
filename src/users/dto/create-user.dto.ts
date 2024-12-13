import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  ArrayNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

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

  // Allow multiple roles
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles?: Role[]; // Expect an array of role names
}
