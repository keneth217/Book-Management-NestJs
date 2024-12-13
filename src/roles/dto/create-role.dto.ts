import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // Ensures each element in the array is an integer (User ID)
  userIds: string[]; // Array of user IDs
}
