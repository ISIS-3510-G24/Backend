import { Module } from '@nestjs/common';
import { NotificationAdController } from './notification_ad.controller';
import { NotificationAdService } from './notification_ad.service';

@Module({
  controllers: [NotificationAdController],
  providers: [NotificationAdService]
})
export class NotificationAdModule {}
