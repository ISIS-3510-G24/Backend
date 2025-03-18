import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { Review } from './review.model';
import * as admin from 'firebase-admin';

@Injectable()
export class ReviewsService {
    private db = FirebaseService.getInstance().getFirestore();

    async createReview(review: Review): Promise<void> {
        const userRef = await this.db.collection('users').doc(review.reviewer_id).get();
        const productRef = await this.db.collection('products').doc(review.product_id).get();

        if (!userRef.exists || !productRef.exists) {
            throw new Error('User or product not found');
        }

        const reviewRef = await this.db.collection('reviews').add(review);

        await this.addReviewToUser(review.reviewer_id, reviewRef.id);
        await this.addReviewToProduct(review.product_id, reviewRef.id);
    }

    async getReviewById(id: string): Promise<Review | null> {
        const doc = await this.db.collection('reviews').doc(id).get();
        return doc.exists ? (doc.data() as Review) : null;
    }

    async updateReview(id: string, data: Partial<Review>): Promise<void> {
        await this.db.collection('reviews').doc(id).update(data);
    }

    async deleteReview(id: string): Promise<void> {
        const reviewRef = await this.db.collection('reviews').doc(id).get();
        if (!reviewRef.exists) {
            throw new Error('Review not found');
        }

        const reviewData = reviewRef.data() as Review;
        await this.removeReviewFromUser(reviewData.reviewer_id, id);
        await this.removeReviewFromProduct(reviewData.product_id, id);

        await this.db.collection('reviews').doc(id).delete();
    }

    async addReviewToUser(reviewerId: string, reviewId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(reviewerId);
        await userRef.update({
            reviews: admin.firestore.FieldValue.arrayUnion(reviewId),
        });
    }

    async addReviewToProduct(productId: string, reviewId: string): Promise<void> {
        const productRef = this.db.collection('products').doc(productId);
        await productRef.update({
            reviews: admin.firestore.FieldValue.arrayUnion(reviewId),
        });
    }

    async removeReviewFromUser(reviewerId: string, reviewId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(reviewerId);
        await userRef.update({
            reviews: admin.firestore.FieldValue.arrayRemove(reviewId),
        });
    }

    async removeReviewFromProduct(productId: string, reviewId: string): Promise<void> {
        const productRef = this.db.collection('products').doc(productId);
        await productRef.update({
            reviews: admin.firestore.FieldValue.arrayRemove(reviewId),
        });
    }

    async createUserReview(review: Review): Promise<void> {
        const userRef = await this.db.collection('users').doc(review.reviewed_user_id).get();
        if (!userRef.exists) {
            throw new Error('User not found');
        }

        const reviewRef = await this.db.collection('reviews').add(review);

        await this.db.collection('users').doc(review.reviewed_user_id).update({
            reviews: admin.firestore.FieldValue.arrayUnion(reviewRef.id),
        });
    }

    async getUserReviews(userId: string): Promise<Review[]> {
        const snapshot = await this.db.collection('reviews')
        .where('reviewed_user_id', '==', userId)
        .get();
    
        return snapshot.docs.map(doc => doc.data() as Review);
    }

    async deleteUserReview(reviewId: string): Promise<void> {
        const reviewRef = await this.db.collection('reviews').doc(reviewId).get();
        if (!reviewRef.exists) {
            throw new Error('Review not found');
        }

        const reviewData = reviewRef.data() as Review;

        await this.db.collection('users').doc(reviewData.reviewed_user_id).update({
            reviews: admin.firestore.FieldValue.arrayRemove(reviewId),
        });

        await this.db.collection('reviews').doc(reviewId).delete();
    }
}
