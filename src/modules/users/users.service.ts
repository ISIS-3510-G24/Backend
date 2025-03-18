import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { User } from './user.model';

@Injectable()
export class UsersService {
    private db = FirebaseService.getInstance().getFirestore();

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
}
