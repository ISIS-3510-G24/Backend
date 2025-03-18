import { Module } from '@nestjs/common';
import { UserState, SubscriptionStatus } from '../../common/enums';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {
    id: number;
    username: string;
    password: string;
    mail_address: string;
    profile_picture: string;
    user_rating: number;
    whishlists: number[];
    status: UserState;
    subscription: SubscriptionStatus;
}
