import { Test, TestingModule } from '@nestjs/testing';
import { UniandesClassService } from './uniandes_class.service';

describe('UniandesClassService', () => {
  let service: UniandesClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniandesClassService],
    }).compile();

    service = module.get<UniandesClassService>(UniandesClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
