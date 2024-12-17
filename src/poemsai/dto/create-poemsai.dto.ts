import { IsString } from 'class-validator';

export class CreatePoemsaiDto {
  @IsString()
  description: string;
}
