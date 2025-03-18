import { Module } from '@nestjs/common';
import { ShoppingBagController } from './shopping_bag.controller';
import { ShoppingBagService } from './shopping_bag.service';

@Module({
  controllers: [ShoppingBagController],
  providers: [ShoppingBagService]
})
export class ShoppingBagModule {}
