// dto/change-role.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from './role.enum';

export class ChangeRoleDto {
  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role must be a valid value (Admin, User, etc.)' })
  role: Role;
}
