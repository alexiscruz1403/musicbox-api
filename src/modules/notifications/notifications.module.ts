import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller.js';
import { NotificationsRepository } from './notifications.repository.js';
import { NotificationsService } from './notifications.service.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { NotificationsQueueProcessor } from './processors/notifications-queue.processor.js';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    NotificationsSseService,
    NotificationsQueueProcessor,
  ],
})
export class NotificationsModule {}
