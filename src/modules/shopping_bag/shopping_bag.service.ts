import { Injectable } from '@nestjs/common';
import { ShoppingBag } from './shopping_bag.model';
import { FirebaseService } from '../../config/firebase.config';
import * as admin from 'firebase-admin';

@Injectable()
export class ShoppingBagService {
    private db = FirebaseService.getInstance().getFirestore();

    async createShoppingBag(shoppingBag: ShoppingBag): Promise<void> {
        const userRef = await this.db.collection('users').doc(shoppingBag.user_id).get();
        if (!userRef.exists) {
            throw new Error('User not found');
        }

        const shoppingBagRef = await this.db.collection('shopping_bags').add(shoppingBag);
        await this.addShoppingToUser(shoppingBag.user_id, shoppingBagRef.id);
    }
    async getShoppingBagById(id: string): Promise<ShoppingBag> {
        const doc = await this.db.collection('').doc(id).get();
        return doc.exists ? (doc.data() as ShoppingBag) : null;
    }

    async updateShoppingBag(id: string, data: Partial<ShoppingBag>): Promise<void> {
        await this.db.collection('shopping_bags').doc(id).update(data);
    }

    async deleteShoppingBag(id: string): Promise<void> {
        const shoppingRef = await this.db.collection('shopping_bags').doc(id).get();
        if (!shoppingRef.exists) {
            throw new Error('shopping not found');
        }

        const shoppingData = shoppingRef.data() as ShoppingBag;

        await this.removeShoppingFromUser(shoppingData.user_id, id);
        await this.db.collection('shopping_bags').doc(id).delete();
    }

    async addShoppingToUser(userId: string, shoppingId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            product_shoppings: admin.firestore.FieldValue.arrayUnion(shoppingId)
        });
    }

    async removeShoppingFromUser(userId: string, shoppingId: string): Promise<void> {
        const userRef = this.db.collection('users').doc(userId);
        await userRef.update({
            product_shoppings: admin.firestore.FieldValue.arrayRemove(shoppingId)
        });
    }

    async addShoppingToOrder(orderId: string, shoppingId: string): Promise<void> {
        const orderRef = this.db.collection('orders').doc(orderId);
        await orderRef.update({
            product_shoppings: admin.firestore.FieldValue.arrayUnion(shoppingId)
        });
    }

    async removeShoppingFromOrder(orderId: string, shoppingId: string): Promise<void> {
        const userRef = this.db.collection('orders').doc(orderId);
        await userRef.update({
            product_shoppings: admin.firestore.FieldValue.arrayRemove(shoppingId)
        });
    }

    async linkShoppingToProduct(shoppingId: string, productId: string): Promise<void> {
        await this.db.collection('product_shoppings').doc(shoppingId).update({
            product_id: productId
        });
    }

    async unlinkShoppingFromProduct(shoppingId: string): Promise<void> {
        await this.db.collection('shopping').doc(shoppingId).update({
            product_id: admin.firestore.FieldValue.delete()
        });
    }
}
