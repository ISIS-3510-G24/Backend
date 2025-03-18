import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { NotificationAd } from './notification_ad.model';

@Injectable()
export class NotificationAdService {
    private db = FirebaseService.getInstance().getFirestore();

    async createNotificationAd(notificationAd: NotificationAd): Promise<void> {
        await this.db.collection('notification_ads').doc(notificationAd.notif_id).set(notificationAd);
    }

    async getNotificationAdById(id: string): Promise<NotificationAd> {
        const doc = await this.db.collection('notification_ads').doc(id).get();
        return doc.exists ? (doc.data() as NotificationAd) : null;
    }

    async getAllNotificationAds(): Promise<NotificationAd[]> {
        const snapshot = await this.db.collection('notification_ads').get();
        return snapshot.docs.map(doc => doc.data() as NotificationAd);
    }

    async updateNotificationAd(id: string, data: Partial<NotificationAd>): Promise<void> {
        await this.db.collection('notification_ads').doc(id).update(data);
    }

    async deleteNotificationAd(id: string): Promise<void> {
        await this.db.collection('notification_ads').doc(id).delete();
    }
}
