var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = __decorate([
    Module({
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
], NotificationsModule);
export { NotificationsModule };
//# sourceMappingURL=notifications.module.js.map