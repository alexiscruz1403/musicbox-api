import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import type { Job } from 'pg-boss';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  NOTIFICATIONS_QUEUE,
  SOCIAL_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import type {
  CommentEventPayload,
  FollowEventPayload,
  FollowRequestAcceptedEventPayload,
  FollowRequestEventPayload,
  ReactionEventPayload,
} from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';

type SocialJobPayload =
  | ReactionEventPayload
  | CommentEventPayload
  | FollowEventPayload
  | FollowRequestEventPayload
  | FollowRequestAcceptedEventPayload;

type SocialJob = JobEnvelope<SocialJobPayload>;

// Eventos relevantes para notificaciones, relayados a NOTIFICATIONS_QUEUE —
// lectura literal de la lista de eventos de musicbox.md §11 (reaction.changed
// excluido, mismo criterio que este processor aplica para follow-suggestions).
const NOTIFIABLE_EVENTS = new Set([
  'reaction.added',
  'comment.created',
  'follow.created',
  'follow.requested',
  'follow.request.accepted',
]);

// Worker (pg-boss) de SOCIAL_QUEUE. Cada job pg-boss se entrega a un solo
// worker (mismo modelo single-consumer que BullMQ), así que este processor es
// el dueño exclusivo de la cola y relaya los eventos que le importan a
// NOTIFICATIONS_QUEUE (que NotificationsModule consume en exclusiva) en vez de
// registrar un segundo worker competidor sobre SOCIAL_QUEUE.
@Injectable()
export class SocialQueueProcessor implements OnApplicationBootstrap {
  constructor(
    private readonly followSuggestions: FollowSuggestionsService,
    private readonly pgBoss: PgBossService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.work<SocialJob>(SOCIAL_QUEUE, (jobs) =>
      this.handleBatch(jobs),
    );
  }

  private async handleBatch(jobs: Job<SocialJob>[]): Promise<void> {
    for (const { data } of jobs) {
      await this.relayToNotifications(data);
      await this.recomputeFollowSuggestions(data);
    }
  }

  private async relayToNotifications({
    event,
    payload,
  }: SocialJob): Promise<void> {
    if (!NOTIFIABLE_EVENTS.has(event)) return;
    await this.pgBoss.boss.send(NOTIFICATIONS_QUEUE, { event, payload });
  }

  private async recomputeFollowSuggestions({
    event,
    payload,
  }: SocialJob): Promise<void> {
    // No-op para comment.created/follow.created y reacciones DISLIKE — solo un
    // LIKE add/change es señal de gusto positiva, según spec.
    if (event !== 'reaction.added' && event !== 'reaction.changed') return;
    const reaction = payload as ReactionEventPayload;
    if (reaction.type !== 'LIKE') return;
    await this.followSuggestions.recompute(reaction.userId);
  }
}
