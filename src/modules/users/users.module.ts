import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ReviewsService } from '../reviews/reviews.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ReviewsService]
})
export class UsersModule {}
