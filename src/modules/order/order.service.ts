import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { Order } from './order.model';


@Injectable()
export class OrderService {
    private db = FirebaseService.getInstance().getFirestore();

    async createOrder(order: Order): Promise<void> {
        await this.db.collection('order').doc(order.id.toString()).set(order);
    }

    async getOrderById(id: number): Promise<Order> {
        const doc = await this.db.collection('order').doc(id.toString()).get();
        return doc.exists ? (doc.data() as Order) : null;
    }
}