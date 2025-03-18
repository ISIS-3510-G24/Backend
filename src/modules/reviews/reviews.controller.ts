import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.model';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @Post()
    async createReview(@Body() review: Review): Promise<void> {
        return this.reviewsService.createReview(review);
    }

    @Get(':id')
    async getReviewById(@Param('id') id: string): Promise<Review | null> {
        return this.reviewsService.getReviewById(id);
    }

    @Put(':id')
    async updateReview(@Param('id') id: string, @Body() data: Partial<Review>): Promise<void> {
        return this.reviewsService.updateReview(id, data);
    }

    @Delete(':id')
    async deleteReview(@Param('id') id: string): Promise<void> {
        return this.reviewsService.deleteReview(id);
    }
}
