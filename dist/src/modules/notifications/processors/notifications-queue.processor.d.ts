import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { NotificationsService } from '../notifications.service.js';
export declare class NotificationsQueueProcessor extends WorkerHost {
    private readonly notifications;
    constructor(notifications: NotificationsService);
    process(job: Job): Promise<void>;
}
