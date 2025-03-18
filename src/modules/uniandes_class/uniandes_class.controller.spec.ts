import { Test, TestingModule } from '@nestjs/testing';
import { Uniandes_ClassController } from './uniandes_class.controller';

describe('Uniandes_ClassController', () => {
  let controller: Uniandes_ClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Uniandes_ClassController],
    }).compile();

    controller = module.get<Uniandes_ClassController>(Uniandes_ClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});