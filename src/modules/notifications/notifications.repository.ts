import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

const HYDRATE_INCLUDE = {
  actor: { select: { handle: true, displayName: true, avatarUrl: true } },
  review: {
    select: {
      id: true,
      externalTitle: true,
      externalArtistName: true,
      externalCoverUrl: true,
    },
  },
} as const;

export interface CreateNotificationInput {
  recipientId: string;
  actorId: string;
  type: 'LIKE' | 'DISLIKE' | 'COMMENT' | 'FOLLOW';
  reviewId?: string;
  commentId?: string;
}

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getRecipientGate(recipientId: string) {
    return this.prisma.user.findUnique({
      where: { id: recipientId },
      select: { notifEnabled: true, notifPreference: true },
    });
  }

  findRecentGroupable(
    recipientId: string,
    reviewId: string,
    type: 'LIKE' | 'DISLIKE',
    since: Date,
  ) {
    return this.prisma.notification.findFirst({
      where: { recipientId, reviewId, type, createdAt: { gte: since } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async incrementGroup(id: string, actorId: string, actorCount: number) {
    await this.prisma.notification.update({
      where: { id },
      data: { actorId, actorCount, readAt: null },
    });
    return this.findHydratedById(id);
  }

  async create(data: CreateNotificationInput) {
    const notification = await this.prisma.notification.create({ data });
    return this.findHydratedById(notification.id);
  }

  findHydratedById(id: string) {
    return this.prisma.notification.findUniqueOrThrow({
      where: { id },
      include: HYDRATE_INCLUDE,
    });
  }

  findById(id: string) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async list(
    recipientId: string,
    cursor: string | undefined,
    limit: number,
    unreadOnly: boolean,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = cursor
      ? Buffer.from(cursor, 'base64').toString('utf8')
      : undefined;

    const rows = await this.prisma.notification.findMany({
      where: { recipientId, ...(unreadOnly ? { readAt: null } : {}) },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: HYDRATE_INCLUDE,
    });

    return this.paginate(rows, take);
  }

  markRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  markAllRead(recipientId: string) {
    return this.prisma.notification.updateMany({
      where: { recipientId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  private paginate<T extends { id: string }>(rows: T[], take: number) {
    const hasMore = rows.length > take;
    const items = hasMore ? rows.slice(0, take) : rows;
    const nextCursor = hasMore
      ? Buffer.from(items[items.length - 1].id).toString('base64')
      : null;
    return { items, nextCursor };
  }
}
