// dto/change-role.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleDto {
  @IsNotEmpty()
  @IsString()
  role: string; // Accept role as a string
}
