import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

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
  @IsOptional()
  @IsEnum(Role, { message: 'Role must be either user or admin' })
  role?: Role;
}
