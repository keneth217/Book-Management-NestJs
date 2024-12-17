import { Test, TestingModule } from '@nestjs/testing';
import { PoemsaiService } from './poemsai.service';

describe('PoemsaiService', () => {
  let service: PoemsaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoemsaiService],
    }).compile();

    service = module.get<PoemsaiService>(PoemsaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
