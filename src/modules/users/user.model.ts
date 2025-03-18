import { UserState, SubscriptionStatus } from '../../common/enums';

export class User {
    id: string;
    username: string;
    password: string;
    mail_address: string;
    profile_Picture: string;
    user_rating: number;
    wishlists: string[];
    reviews: string[];
    status: UserState;
    subscription: SubscriptionStatus;
}