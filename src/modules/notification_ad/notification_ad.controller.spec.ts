import { Test, TestingModule } from '@nestjs/testing';
import { NotificationAdController } from './notification_ad.controller';

describe('NotificationAdController', () => {
  let controller: NotificationAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationAdController],
    }).compile();

    controller = module.get<NotificationAdController>(NotificationAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
