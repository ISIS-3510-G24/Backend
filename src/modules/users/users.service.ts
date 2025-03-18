import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { User } from './user.model';

@Injectable()
export class UsersService {
    private db = FirebaseService.getInstance().getFirestore();

    async createUser(user: User): Promise<void> {
        await this.db.collection('users').doc(user.id.toString()).set(user);
    }

    async getUserById(id: number): Promise<User> {
        const doc = await this.db.collection('users').doc(id.toString()).get();
        return doc.exists ? (doc.data() as User) : null;
    }
}
