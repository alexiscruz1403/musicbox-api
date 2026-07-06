import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { NOTIFICATIONS_QUEUE } from '../../events/events.constants.js';
import { NotificationsService } from '../notifications.service.js';

// Exclusive owner of NOTIFICATIONS_QUEUE — fed by the relay added to
// FollowSuggestionsModule's SocialQueueProcessor (see docs/musicbox-backend-guide.md:2066:
// a queue can only have one @Processor, so this consumer never listens on
// SOCIAL_QUEUE directly).
@Injectable()
@Processor(NOTIFICATIONS_QUEUE)
export class NotificationsQueueProcessor extends WorkerHost {
  constructor(private readonly notifications: NotificationsService) {
    super();
  }

  async process(job: Job): Promise<void> {
    await this.notifications.createFromEvent(job.name, job.data);
  }
}
