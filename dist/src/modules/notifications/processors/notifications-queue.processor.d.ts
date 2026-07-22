import { type OnApplicationBootstrap } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { NotificationsService } from '../notifications.service.js';
export declare class NotificationsQueueProcessor implements OnApplicationBootstrap {
    private readonly notifications;
    private readonly pgBoss;
    constructor(notifications: NotificationsService, pgBoss: PgBossService);
    onApplicationBootstrap(): Promise<void>;
    private handleBatch;
}
