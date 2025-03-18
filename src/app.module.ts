import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ProductRequestModule } from './modules/product_request/product_request.module';
import { NotificationAdModule } from './modules/notification_ad/notification_ad.module';
import { UniandesClassModule } from './modules/uniandes_class/uniandes_class.module';
import { ShoppingBagModule } from './modules/shopping_bag/shopping_bag.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [UsersModule, ProductsModule, ReviewsModule, OrderModule, ProductRequestModule, NotificationAdModule, UniandesClassModule, ShoppingBagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
