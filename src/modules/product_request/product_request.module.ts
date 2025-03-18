import { Module } from '@nestjs/common';
import { ProductRequestController } from './product_request.controller';
import { ProductRequestService } from './product_request.service';

@Module({
  controllers: [ProductRequestController],
  providers: [ProductRequestService]
})
export class ProductRequestModule {}
