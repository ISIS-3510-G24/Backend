import { Test, TestingModule } from '@nestjs/testing';
import { Uniandes_ClassService } from './uniandes_class.service';

describe('Uniandes_ClassService', () => {
  let service: Uniandes_ClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Uniandes_ClassService],
    }).compile();

    service = module.get<Uniandes_ClassService>(Uniandes_ClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
