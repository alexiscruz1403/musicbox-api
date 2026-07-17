import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import webpush from 'web-push';
import { PushSubscriptionsRepository } from './push-subscriptions.repository.js';

// Structural — matches the hydrated notification shape returned by
// NotificationsRepository (HYDRATE_INCLUDE), duck-typed rather than imported
// to avoid a dependency from push/ back into the repository's Prisma types.
export interface PushableNotification {
  id: string;
  type: string;
  commentId: string | null;
  actorCount: number | null;
  createdAt: Date;
  actor: {
    handle: string;
    displayName: string;
    avatarUrl: string | null;
  } | null;
  review: {
    id: string;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl: string | null;
  } | null;
}

@Injectable()
export class WebPushService implements OnModuleInit {
  private readonly logger = new Logger(WebPushService.name);

  constructor(
    private readonly repo: PushSubscriptionsRepository,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    webpush.setVapidDetails(
      this.config.getOrThrow<string>('VAPID_SUBJECT'),
      this.config.getOrThrow<string>('VAPID_PUBLIC_KEY'),
      this.config.getOrThrow<string>('VAPID_PRIVATE_KEY'),
    );
  }

  // Fire-and-forget by design (same convention as CatalogHistoryService's
  // swallow-on-error auxiliary writes): a push delivery failure must never
  // fail the BullMQ notification job (which has its own retry semantics) nor
  // the synchronous notifyModeration() call path.
  async sendToUser(
    recipientId: string,
    notification: PushableNotification,
  ): Promise<void> {
    try {
      const subscriptions = await this.repo.listByUserId(recipientId);
      if (subscriptions.length === 0) return;

      // Compact payload only — Web Push has a ~4KB post-encryption ceiling.
      // The frontend service worker decides title/body copy/localization.
      const payload = JSON.stringify({
        type: notification.type,
        actor: notification.actor,
        review: notification.review,
        commentId: notification.commentId,
        actorCount: notification.actorCount,
        createdAt: notification.createdAt,
      });

      const results = await Promise.allSettled(
        subscriptions.map((sub) =>
          webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            payload,
          ),
        ),
      );

      await Promise.all(
        results.map(async (result, index) => {
          if (result.status === 'fulfilled') return;
          const sub = subscriptions[index];
          const err = result.reason as { statusCode?: number };
          if (err.statusCode === 404 || err.statusCode === 410) {
            await this.repo.deleteById(sub.id);
            return;
          }
          this.logger.warn(
            `Push send failed for subscription ${sub.id}: ${String(result.reason)}`,
          );
        }),
      );
    } catch (err) {
      this.logger.warn(`Push fan-out failed for user ${recipientId}: ${err}`);
    }
  }
}
