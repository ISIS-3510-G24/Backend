import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { User } from './user.model';
import * as admin from 'firebase-admin';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class UsersService {
    private db = FirebaseService.getInstance().getFirestore();

    constructor(private readonly reviewsService: ReviewsService) {}

    async createUser(user: User): Promise<void> {
        await this.db.collection('users').doc(user.id).set(user);
    }

    async getUserById(id: string): Promise<User> {
        const doc = await this.db.collection('users').doc(id).get();
        return doc.exists ? (doc.data() as User) : null;
    }

    async updateUser(id: string, data: Partial<User>): Promise<void> {
        await this.db.collection('users').doc(id).update(data);
    }

    async deleteUser(id: string): Promise<void> {
        await this.db.collection('users').doc(id).delete();
    }

    async addReviewToUser(userId: string, reviewId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            reviews: admin.firestore.FieldValue.arrayUnion(reviewId)
        });
    }

    async removeReviewFromUser(userId: string, reviewId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            reviews: admin.firestore.FieldValue.arrayRemove(reviewId)
        });
    }

    async addToWhishlist(userId: string, productId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            wishlists: admin.firestore.FieldValue.arrayUnion(productId)
        });
    }

    async removeFromWhishlist(userId: string, productId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            wishlists: admin.firestore.FieldValue.arrayRemove(productId)
        });
    }

    async updateUserRating(userId: string): Promise<void> {
        const reviews = await this.reviewsService.getUserReviews(userId);
        if (reviews.length === 0) {
            await this.db.collection('users').doc(userId).update({ user_rating: 0 });
            return;
        }

        const avgRating = reviews.reduce((sum, r) => sum + r.review_rating, 0) / reviews.length;

        await this.db.collection('users').doc(userId).update({ user_rating: avgRating });
    }
}
