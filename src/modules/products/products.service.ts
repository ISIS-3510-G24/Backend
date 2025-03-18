import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private db = FirebaseService.getInstance().getFirestore();

    async createProduct(product: Product): Promise<void> {
        await this.db.collection('products').doc(product.product_id.toString()).set(product);
    }

    async getProductById(id: number): Promise<Product> {
        const doc = await this.db.collection('products').doc(id.toString()).get();
        return doc.exists ? (doc.data() as Product) : null;
    }
}
