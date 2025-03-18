import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';


@Module({
  imports: [UsersModule, ProductsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
