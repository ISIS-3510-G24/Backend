import { Module } from '@nestjs/common';
import { ProductRequestController } from './product-request.controller';
import { ProductRequestService } from './product-request.service';

@Module({
  controllers: [ProductRequestController],
  providers: [ProductRequestService]
})
export class ProductRequestModule {}
