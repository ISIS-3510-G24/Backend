import { Injectable } from '@nestjs/common';
import { ShoppingBag } from './shopping_bag.model';
import { FirebaseService } from '../../config/firebase.config';
import * as admin from 'firebase-admin';

@Injectable()
export class ShoppingBagService {
    private db = FirebaseService.getInstance().getFirestore();

    async createShoppingBag(shoppingBag: ShoppingBag): Promise<void> {
        await this.db.collection('shopping_bags').doc(shoppingBag.id).set(shoppingBag);
    }

    async getShoppingBagById(id: string): Promise<ShoppingBag> {
        const doc = await this.db.collection('').doc(id).get();
        return doc.exists ? (doc.data() as ShoppingBag) : null;
    }

    async updateShoppingBag(id: string, data: Partial<ShoppingBag>): Promise<void> {
        await this.db.collection('shopping_bags').doc(id).update(data);
    }

    async deleteShoppingBag(id: string): Promise<void> {
        await this.db.collection('shopping_bags').doc(id).delete();
    }

    async addProductToShoppingBag(bagId: string, product: { product_id: string, quantity: number }): Promise<void> {
        const bagRef = this.db.collection('shopping_bags').doc(bagId);
        const productRef = await this.db.collection('products').doc(product.product_id).get();
        await bagRef.update({
            products: admin.firestore.FieldValue.arrayUnion(product),
            total_price: admin.firestore.FieldValue.increment(product.quantity * productRef.data().price)
        });
    }

    async removeProductFromShoppingBag(bagId: string, product: { product_id: string, quantity: number }): Promise<void> {
        const bagRef = this.db.collection('shopping_bags').doc(bagId);
        const bag = await bagRef.get();

        if (!bag.exists) {
            throw new Error('Shopping bag not found');
        }

        const bagData = bag.data();
        const updatedProducts = bagData.products.filter(p => p.product_id !== product.product_id);

        await bagRef.update({
            products: updatedProducts,
            total_price: admin.firestore.FieldValue.increment(-product.quantity * bagData.products.find(p => p.product_id === product.product_id).quantity)
        });
    }

    async clearBag(bagId: string): Promise<void> {
        const bagRef = this.db.collection('shopping_bags').doc(bagId);
        await bagRef.update({
            products: [],
            total_price: 0
        });
    }

    async linkBagToOrder(bagId: string, orderId: string): Promise<void> {
        await this.db.collection('shopping_bags').doc(bagId).update({
            order_id: orderId
        });
    }

    async unlinkBagFromOrder(bagId: string): Promise<void> {
        await this.db.collection('shopping_bags').doc(bagId).update({
            order_id: admin.firestore.FieldValue.delete()
        });
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
