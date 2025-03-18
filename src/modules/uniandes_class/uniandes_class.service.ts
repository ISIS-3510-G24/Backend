import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { UniandesClass } from './uniandes_class.model';
import { Product } from '../products/product.model';

@Injectable()
export class UniandesClassService {
    private db = FirebaseService.getInstance().getFirestore();

    async createUniandesClass(uniandes_Class: UniandesClass): Promise<void> {
        await this.db.collection('uniandes_classes').doc(uniandes_Class.id).set(uniandes_Class);
    }

    async getUniandesClassById(id: string): Promise<UniandesClass> {
        const doc = await this.db.collection('uniandes_classes').doc(id).get();
        return doc.exists ? (doc.data() as UniandesClass) : null;
    }

    async deleteClass(id: string): Promise<void> {
        await this.db.collection('uniandes_Class').doc(id).delete();
    }

    async updateUniandesClass(id: string, data: Partial<UniandesClass>): Promise<void> {
        await this.db.collection('uniandes_classes').doc(id).update(data);
    }

    async addProductToClass(classId: string, productId: string): Promise<void> {
        await this.db.collection('class_products').add({
            class_id: classId,
            product_id: productId
        });
    }

    async removeProductFromClass(classId: string, productId: string): Promise<void> {
        const snapshot = await this.db.collection('class_products')
            .where('class_id', '==', classId)
            .where('product_id', '==', productId)
            .get();
        snapshot.forEach(async (doc) => {
            await this.db.collection('class_products').doc(doc.id).delete();
        });
    }

    async getProductsByClass(classId: string): Promise<Product[]> {
        const snapshot = await this.db.collection('class_products')
            .where('class_id', '==', classId)
            .get();
        
        const productIds = snapshot.docs.map(doc => doc.data().product_id);

        if (productIds.length === 0) {
            return [];
        }

        const productSnapshots = await Promise.all(
            productIds.map(id => this.db.collection('products').doc(id).get())
        );

        return productSnapshots.map(doc => doc.data() as Product);
    }

    async getClassesByProduct(productId: string): Promise<UniandesClass[]> {
        const snapshot = await this.db.collection('class_products')
            .where('product_id', '==', productId)
            .get();
        
        const classIds = snapshot.docs.map(doc => doc.data().class_id);

        if (classIds.length === 0) {
            return [];
        }

        const classSnapshots = await Promise.all(
            classIds.map(id => this.db.collection('uniandes_classes').doc(id).get())
        );

        return classSnapshots.map(doc => doc.data() as UniandesClass);
    }
}