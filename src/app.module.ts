import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ProductRequestModule } from './modules/product_request/product_request.module';
import { NotificationAdModule } from './modules/notification_ad/notification_ad.module';


@Module({
  imports: [UsersModule, ProductsModule, ReviewsModule, OrderModule, ProductRequestModule, NotificationAdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
