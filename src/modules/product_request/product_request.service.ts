import { Injectable } from '@nestjs/common';
import { ProductRequest } from './product_request.model';
import { FirebaseService } from '../../config/firebase.config';
import * as admin from 'firebase-admin';

@Injectable()
export class ProductRequestService {
    private db = FirebaseService.getInstance().getFirestore();

    async createProductRequest(productRequest: ProductRequest): Promise<void> {
        const userRef = await this.db.collection('users').doc(productRequest.user_id).get();
        if (!userRef.exists) {
            throw new Error('User not found');
        }

        const productRequestRef = await this.db.collection('product_requests').add(productRequest);
        await this.addRequestToUser(productRequest.user_id, productRequestRef.id);
    }

    async getProductRequestById(id: string): Promise<ProductRequest> {
        const doc = await this.db.collection('product_requests').doc(id).get();
        return doc.exists ? (doc.data() as ProductRequest) : null;
    }

    async updateProductRequest(id: string, data: Partial<ProductRequest>): Promise<void> {
        await this.db.collection('product_requests').doc(id).update(data);
    }

    async deleteProductRequest(id: string): Promise<void> {
        const requestRef = await this.db.collection('product_requests').doc(id).get();
        if (!requestRef.exists) {
            throw new Error('Request not found');
        }

        const requestData = requestRef.data() as ProductRequest;

        await this.removeRequestFromUser(requestData.user_id, id);
        await this.db.collection('product_requests').doc(id).delete();
    }

    async addRequestToUser(userId: string, requestId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            product_requests: admin.firestore.FieldValue.arrayUnion(requestId)
        });
    }

    async removeRequestFromUser(userId: string, requestId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            product_requests: admin.firestore.FieldValue.arrayRemove(requestId)
        });
    }

    async linkRequestToProduct(requestId: string, productId: string): Promise<void> {
        await this.db.collection('product_requests').doc(requestId).update({
            product_id: productId
        });
    }

    async unlinkRequestFromProduct(requestId: string): Promise<void> {
        await this.db.collection('product_requests').doc(requestId).update({
            product_id: admin.firestore.FieldValue.delete()
        });
    }
}
