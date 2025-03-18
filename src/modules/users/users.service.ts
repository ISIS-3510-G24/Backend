import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { UsersModule } from './users.module';

@Injectable()
export class UsersService {
    private db = FirebaseService.getInstance().getFirestore();

    async createUser(user: UsersModule): Promise<void> {
        await this.db.collection('users').doc(user.id.toString()).set(user);
    }

    async getUserById(id: number): Promise<UsersModule> {
        const doc = await this.db.collection('users').doc(id.toString()).get();
        return doc.exists ? (doc.data() as UsersModule) : null;
    }
}
