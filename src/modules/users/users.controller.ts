import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ReviewsService } from '../reviews/reviews.service';
import { User } from './user.model';
import { Review } from '../reviews/review.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly reviewService: ReviewsService
    ) {}

    @Post()
    async createUser(@Body() user: User): Promise<void> {
        return this.usersService.createUser(user);
    }

    @Post(':id/reviews')
    async createUserReview(@Param('id') reviewedUserId: string, @Body() review: Review): Promise<void> {
        review.reviewed_user_id = reviewedUserId;
        return this.reviewService.createUserReview(review);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.getUserById(id);
    }

    @Get(':id/reviews')
    async getUserReviews(@Param('id') id: string): Promise<Review[]> {
        return this.reviewService.getUserReviews(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Partial<User>): Promise<void> {
        return this.usersService.updateUser(id, data);
    }

    @Put(':id/reviews/:reviewId')
    async addReviewToUser(@Param('id') userId: string, @Param('reviewId') reviewId: string): Promise<void> {
        return this.usersService.addReviewToUser(userId, reviewId);
    }

    @Put(':id/wishlist/:productId')
    async addToWhishlist(@Param('id') userId: string, @Param('productId') productId: string): Promise<void> {
        return this.usersService.addToWhishlist(userId, productId);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    @Delete(':id/reviews/:reviewId')
    async removeReviewFromUser(@Param('id') userId: string, @Param('reviewId') reviewId: string): Promise<void> {
        return this.usersService.removeReviewFromUser(userId, reviewId);
    }

    @Delete('reviews/:reviewId')
    async deleteReview(@Param('reviewId') reviewId: string): Promise<void> {
        return this.reviewService.deleteReview(reviewId);
    }

    @Delete(':id/wishlist/:productId')
    async removeFromWhishlist(@Param('id') userId: string, @Param('productId') productId: string): Promise<void> {
        return this.usersService.removeFromWhishlist(userId, productId);
    }
}