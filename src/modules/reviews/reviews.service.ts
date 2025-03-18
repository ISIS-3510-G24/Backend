import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { Review } from './review.model';

@Injectable()
export class ReviewsService {
    private db = FirebaseService.getInstance().getFirestore();

    async createReview(review: Review): Promise<void> {
        await this.db.collection('reviews').doc(review.id).set(review);
    }

    async getReviewById(id: string): Promise<Review | null> {
        const doc = await this.db.collection('reviews').doc(id).get();
        return doc.exists ? (doc.data() as Review) : null;
    }

    async updateReview(id: string, data: Partial<Review>): Promise<void> {
        await this.db.collection('reviews').doc(id).update(data);
    }

    async deleteReview(id: string): Promise<void> {
        await this.db.collection('reviews').doc(id).delete();
    }
}
