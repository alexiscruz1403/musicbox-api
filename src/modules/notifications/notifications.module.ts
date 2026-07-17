import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller.js';
import { NotificationsRepository } from './notifications.repository.js';
import { NotificationsService } from './notifications.service.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { NotificationsQueueProcessor } from './processors/notifications-queue.processor.js';
import { PushSubscriptionsController } from './push/push-subscriptions.controller.js';
import { PushSubscriptionsRepository } from './push/push-subscriptions.repository.js';
import { PushSubscriptionsService } from './push/push-subscriptions.service.js';
import { WebPushService } from './push/web-push.service.js';

@Module({
  controllers: [NotificationsController, PushSubscriptionsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    NotificationsSseService,
    NotificationsQueueProcessor,
    PushSubscriptionsRepository,
    PushSubscriptionsService,
    WebPushService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
