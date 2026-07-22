import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  CommentEventPayload,
  FollowEventPayload,
  FollowRequestAcceptedEventPayload,
  FollowRequestEventPayload,
  ReactionEventPayload,
} from '../events/social-events.producer.js';
import type { ListNotificationsQueryDto } from './dto/list-notifications-query.dto.js';
import { NOTIFICATION_GROUP_WINDOW_MS } from './notifications.constants.js';
import {
  NotificationsRepository,
  type CreateNotificationInput,
} from './notifications.repository.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { WebPushService } from './push/web-push.service.js';

interface NotificationPreferenceGate {
  notifEnabled: boolean;
  notifPreference: {
    likesEnabled: boolean;
    dislikesEnabled: boolean;
    commentsEnabled: boolean;
    followsEnabled: boolean;
    followRequestsEnabled: boolean;
  } | null;
}

@Injectable()
export class NotificationsService {
  constructor(
    private readonly repo: NotificationsRepository,
    private readonly sse: NotificationsSseService,
    private readonly webPush: WebPushService,
  ) {}

  async list(userId: string, query: ListNotificationsQueryDto) {
    return this.repo.list(
      userId,
      query.cursor,
      query.limit,
      query.unreadOnly ?? false,
    );
  }

  async markRead(userId: string, id: string) {
    const notification = await this.getOwnedNotification(userId, id);
    if (notification.readAt) return notification;
    return this.repo.markRead(id);
  }

  async markAllRead(userId: string): Promise<void> {
    await this.repo.markAllRead(userId);
  }

  // Aviso de moderación (contenido ocultado por un admin) — creado directo
  // por ModerationModule, sin pasar por la cola de jobs (acción de bajo
  // volumen) y sin gating por notifEnabled/notifPreference: es un aviso de
  // política, no un opt-out social.
  async notifyModeration(
    recipientId: string,
    payload: { reviewId?: string; commentId?: string },
  ): Promise<void> {
    const notification = await this.repo.create({
      recipientId,
      type: 'MODERATION',
      ...payload,
    });
    this.sse.push(recipientId, notification);
    void this.webPush.sendToUser(recipientId, notification);
  }

  // Entry point for NotificationsQueueProcessor — fed by the relay in
  // FollowSuggestionsModule's SocialQueueProcessor (see docs/musicbox-backend-guide.md:2066
  // for why NotificationsModule can't register its own @Processor(SOCIAL_QUEUE)).
  async createFromEvent(jobName: string, payload: unknown): Promise<void> {
    const input = this.buildInput(jobName, payload);
    if (!input) return;
    if (input.recipientId === input.actorId) return; // self-action, e.g. reacting to your own review

    const gate = await this.repo.getRecipientGate(input.recipientId);
    if (!gate || !gate.notifEnabled || !this.isTypeEnabled(input.type, gate))
      return;

    const notification =
      input.type === 'LIKE' || input.type === 'DISLIKE'
        ? await this.createOrGroupReaction(input)
        : await this.repo.create(input);

    this.sse.push(input.recipientId, notification);
    void this.webPush.sendToUser(input.recipientId, notification);
  }

  private buildInput(
    jobName: string,
    payload: unknown,
  ): CreateNotificationInput | null {
    switch (jobName) {
      case 'reaction.added': {
        const p = payload as ReactionEventPayload;
        return {
          recipientId: p.reviewOwnerId,
          actorId: p.userId,
          type: p.type,
          reviewId: p.reviewId,
        };
      }
      case 'comment.created': {
        const p = payload as CommentEventPayload;
        return {
          recipientId: p.reviewOwnerId,
          actorId: p.userId,
          type: 'COMMENT',
          reviewId: p.reviewId,
          commentId: p.commentId,
        };
      }
      case 'follow.created': {
        const p = payload as FollowEventPayload;
        return {
          recipientId: p.followeeId,
          actorId: p.followerId,
          type: 'FOLLOW',
        };
      }
      case 'follow.requested': {
        const p = payload as FollowRequestEventPayload;
        return {
          recipientId: p.targetId,
          actorId: p.requesterId,
          type: 'FOLLOW_REQUEST',
        };
      }
      case 'follow.request.accepted': {
        const p = payload as FollowRequestAcceptedEventPayload;
        return {
          recipientId: p.requesterId,
          actorId: p.accepterId,
          type: 'FOLLOW_REQUEST_ACCEPTED',
        };
      }
      default:
        return null;
    }
  }

  private isTypeEnabled(
    type: CreateNotificationInput['type'],
    gate: NotificationPreferenceGate,
  ): boolean {
    const prefs = gate.notifPreference;
    if (!prefs) return true;
    switch (type) {
      case 'LIKE':
        return prefs.likesEnabled;
      case 'DISLIKE':
        return prefs.dislikesEnabled;
      case 'COMMENT':
        return prefs.commentsEnabled;
      case 'FOLLOW':
        return prefs.followsEnabled;
      // Distinta de followsEnabled (post-Fase 7): una cuenta pública solo
      // configura followsEnabled (nunca recibe FOLLOW_REQUEST, ya que el
      // follow directo no pasa por solicitud); una cuenta privada solo
      // configura followRequestsEnabled (nunca recibe FOLLOW directo). Ver
      // UsersService para el filtrado de cuál campo es configurable.
      case 'FOLLOW_REQUEST':
      case 'FOLLOW_REQUEST_ACCEPTED':
        return prefs.followRequestsEnabled;
      case 'MODERATION':
        return true;
    }
  }

  // Reactions group by (recipient, review, type) — LIKE and DISLIKE never
  // share a bucket — within a fixed 5-minute window anchored to the first
  // reaction of the burst (not a sliding window). New activity in an already
  // grouped notification resets readAt so it resurfaces as unread.
  private async createOrGroupReaction(input: CreateNotificationInput) {
    const type = input.type as 'LIKE' | 'DISLIKE';
    const since = new Date(Date.now() - NOTIFICATION_GROUP_WINDOW_MS);
    const existing = await this.repo.findRecentGroupable(
      input.recipientId,
      input.reviewId!,
      type,
      since,
    );
    if (!existing) return this.repo.create(input);

    const nextCount = (existing.actorCount ?? 1) + 1;
    return this.repo.incrementGroup(existing.id, input.actorId!, nextCount);
  }

  private async getOwnedNotification(userId: string, id: string) {
    const notification = await this.repo.findById(id);
    if (!notification) {
      throw new NotFoundException({
        code: 'NOTIFICATION_NOT_FOUND',
      });
    }
    if (notification.recipientId !== userId) {
      throw new ForbiddenException({
        code: 'NOT_NOTIFICATION_RECIPIENT',
      });
    }
    return notification;
  }
}
