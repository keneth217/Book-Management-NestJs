import { Module } from '@nestjs/common';
import { PoemsaiService } from './poemsai.service';
import { PoemsaiController } from './poemsai.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PoemsaiController],
  providers: [PoemsaiService],
})
export class PoemsaiModule {}
