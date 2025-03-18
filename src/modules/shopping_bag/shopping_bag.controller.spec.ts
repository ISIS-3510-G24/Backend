import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingBagController } from './shopping_bag.controller';

describe('ShoppingBagController', () => {
  let controller: ShoppingBagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingBagController],
    }).compile();

    controller = module.get<ShoppingBagController>(ShoppingBagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
