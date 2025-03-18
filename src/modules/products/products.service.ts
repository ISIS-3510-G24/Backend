import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { Product } from './product.model';
import * as admin from 'firebase-admin';

@Injectable()
export class ProductsService {
    private db = FirebaseService.getInstance().getFirestore();

    async createProduct(product: Product): Promise<void> {
        await this.db.collection('products').doc(product.product_id).set(product);
    }

    async getProductById(id: string): Promise<Product> {
        const doc = await this.db.collection('products').doc(id).get();
        return doc.exists ? (doc.data() as Product) : null;
    }

    async getAllProducts(): Promise<Product[]> {
        const snapshot = await this.db.collection('products').get();
        return snapshot.docs.map(doc => doc.data() as Product);
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<void> {
        await this.db.collection('products').doc(id).update(data);
    }

    async deleteProduct(id: string): Promise<void> {
        await this.db.collection('products').doc(id).delete();
    }

    async addReviewToProduct(productId: string, reviewId: string): Promise<void> {
        const productRef = this.db.collection('products').doc(productId);
        await productRef.update({
            reviews: admin.firestore.FieldValue.arrayUnion(reviewId)
        });
    }

    async removeReviewFromProduct(productId: string, reviewId: string): Promise<void> {
        const productRef = this.db.collection('products').doc(productId);
        await productRef.update({
            reviews: admin.firestore.FieldValue.arrayRemove(reviewId)
        });
    }
}
