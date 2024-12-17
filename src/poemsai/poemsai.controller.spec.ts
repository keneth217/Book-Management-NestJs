import { Test, TestingModule } from '@nestjs/testing';
import { PoemsaiController } from './poemsai.controller';
import { PoemsaiService } from './poemsai.service';

describe('PoemsaiController', () => {
  let controller: PoemsaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoemsaiController],
      providers: [PoemsaiService],
    }).compile();

    controller = module.get<PoemsaiController>(PoemsaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
