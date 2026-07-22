import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import type { Job } from 'pg-boss';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  NOTIFICATIONS_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { NotificationsService } from '../notifications.service.js';

// Dueño exclusivo de NOTIFICATIONS_QUEUE — alimentado por el relay de
// SocialQueueProcessor (FollowSuggestionsModule): cada job pg-boss va a un
// solo worker, así que este consumer nunca escucha SOCIAL_QUEUE directamente.
@Injectable()
export class NotificationsQueueProcessor implements OnApplicationBootstrap {
  constructor(
    private readonly notifications: NotificationsService,
    private readonly pgBoss: PgBossService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.work<JobEnvelope>(NOTIFICATIONS_QUEUE, (jobs) =>
      this.handleBatch(jobs),
    );
  }

  private async handleBatch(jobs: Job<JobEnvelope>[]): Promise<void> {
    for (const { data } of jobs) {
      await this.notifications.createFromEvent(data.event, data.payload);
    }
  }
}
