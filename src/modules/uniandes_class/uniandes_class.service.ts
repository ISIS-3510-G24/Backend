import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { Uniandes_Class } from './uniandes_class.model';

@Injectable()
export class Uniandes_ClassService {
    private db = FirebaseService.getInstance().getFirestore();

    async createUniandes_Class(uniandes_Class: Uniandes_Class): Promise<void> {
        await this.db.collection('uniandes_Class').doc(uniandes_Class.id.toString()).set(uniandes_Class);
    }

    async getUniandes_ClassById(id: number): Promise<Uniandes_Class> {
        const doc = await this.db.collection('uniandes_Class').doc(id.toString()).get();
        return doc.exists ? (doc.data() as Uniandes_Class) : null;
    }
}