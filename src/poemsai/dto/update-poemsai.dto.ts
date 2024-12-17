import { PartialType } from '@nestjs/mapped-types';
import { CreatePoemsaiDto } from './create-poemsai.dto';

export class UpdatePoemsaiDto extends PartialType(CreatePoemsaiDto) {}
