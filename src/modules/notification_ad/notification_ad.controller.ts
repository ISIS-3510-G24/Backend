import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotificationAdService } from './notification_ad.service';
import { NotificationAd } from './notification_ad.model';

@Controller('notification-ad')
export class NotificationAdController {
    constructor(private readonly notificationAdService: NotificationAdService) {}

    @Post()
    async createNotificationAd(@Body() notificationAd: NotificationAd): Promise<void> {
        await this.notificationAdService.createNotificationAd(notificationAd);
    }

    @Get(':id')
    async getNotificationAdById(@Param('id') id: string): Promise<NotificationAd> {
        return this.notificationAdService.getNotificationAdById(id);
    }

    @Get()
    async getAllNotificationAds(): Promise<NotificationAd[]> {
        return this.notificationAdService.getAllNotificationAds();
    }

    @Put(':id')
    async updateNotificationAd(@Param('id') id: string, @Body() data: Partial<NotificationAd>): Promise<void> {
        await this.notificationAdService.updateNotificationAd(id, data);
    }

    @Delete(':id')
    async deleteNotificationAd(@Param('id') id: string): Promise<void> {
        await this.notificationAdService.deleteNotificationAd(id);
    }
}
