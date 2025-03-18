import { Test, TestingModule } from '@nestjs/testing';
import { NotificationAdService } from './notification_ad.service';

describe('NotificationAdService', () => {
  let service: NotificationAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationAdService],
    }).compile();

    service = module.get<NotificationAdService>(NotificationAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
