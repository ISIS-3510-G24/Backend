import { Test, TestingModule } from '@nestjs/testing';
import { UniandesClassController } from './uniandes_class.controller';

describe('Uniandes_ClassController', () => {
  let controller: UniandesClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniandesClassController],
    }).compile();

    controller = module.get<UniandesClassController>(UniandesClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});