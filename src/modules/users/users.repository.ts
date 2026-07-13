import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findFirst({ where: { id, deletedAt: null } });
  }

  findByHandle(handle: string) {
    return this.prisma.user.findFirst({ where: { handle, deletedAt: null } });
  }

  getStats(userId: string) {
    return Promise.all([
      this.prisma.review.count({ where: { userId } }),
      this.prisma.follow.count({ where: { followeeId: userId } }),
      this.prisma.follow.count({ where: { followerId: userId } }),
    ]);
  }

  async updateProfile(userId: string, data: UpdateProfileDto) {
    return this.prisma.user.update({ where: { id: userId }, data });
  }

  async anonimize(userId: string) {
    const before = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatarPublicId: true, coverPublicId: true },
    });

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          email: `deleted_${userId}@musicbox.invalid`,
          handle: `deleted_${userId}`,
          displayName: '[usuario eliminado]',
          passwordHash: null,
          googleId: null,
          avatarUrl: null,
          avatarPublicId: null,
          coverUrl: null,
          coverPublicId: null,
          bio: null,
          status: 'DELETED',
          deletedAt: new Date(),
        },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

    return before;
  }

  // Derecho de acceso (Ley 25.326) — sin filtro de status/deletedAt, cubre
  // todo el dato retenido incluyendo contenido oculto/borrado por el propio
  // usuario. Promise.all (no $transaction): sólo lectura, sin necesidad de
  // atomicidad.
  async getExportData(userId: string) {
    const [reviews, comments, reactions, followers, following, notifPrefs] =
      await Promise.all([
        this.prisma.review.findMany({
          where: { userId },
          include: { trackReviewItems: true },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.comment.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.reviewReaction.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.follow.findMany({
          where: { followeeId: userId },
          include: {
            follower: {
              select: { id: true, handle: true, displayName: true },
            },
          },
        }),
        this.prisma.follow.findMany({
          where: { followerId: userId },
          include: {
            followee: {
              select: { id: true, handle: true, displayName: true },
            },
          },
        }),
        this.prisma.notificationPreference.findUnique({
          where: { userId },
        }),
      ]);
    return { reviews, comments, reactions, followers, following, notifPrefs };
  }

  updateAvatar(userId: string, avatarUrl: string, avatarPublicId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl, avatarPublicId },
    });
  }

  updateCover(userId: string, coverUrl: string, coverPublicId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { coverUrl, coverPublicId },
    });
  }

  getNotifPrefs(userId: string) {
    return this.prisma.notificationPreference.findUnique({ where: { userId } });
  }

  updateNotifPrefs(userId: string, data: UpdateNotifPrefsDto) {
    return this.prisma.notificationPreference.update({
      where: { userId },
      data,
    });
  }

  async getFollowers(handle: string, cursor?: string, limit = 20) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { handle },
      select: { id: true },
    });
    const take = Math.min(limit, 50);
    const cursorDate = cursor
      ? new Date(Buffer.from(cursor, 'base64').toString('utf8'))
      : undefined;

    const follows = await this.prisma.follow.findMany({
      where: {
        followeeId: user.id,
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      take: take + 1,
      orderBy: { createdAt: 'desc' },
      include: {
        follower: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    const hasMore = follows.length > take;
    const items = hasMore ? follows.slice(0, take) : follows;
    const nextCursor = hasMore
      ? Buffer.from(items[items.length - 1].createdAt.toISOString()).toString(
          'base64',
        )
      : null;

    return { items: items.map((f) => f.follower), nextCursor };
  }

  async getFollowing(handle: string, cursor?: string, limit = 20) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { handle },
      select: { id: true },
    });
    const take = Math.min(limit, 50);
    const cursorDate = cursor
      ? new Date(Buffer.from(cursor, 'base64').toString('utf8'))
      : undefined;

    const follows = await this.prisma.follow.findMany({
      where: {
        followerId: user.id,
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      take: take + 1,
      orderBy: { createdAt: 'desc' },
      include: {
        followee: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    const hasMore = follows.length > take;
    const items = hasMore ? follows.slice(0, take) : follows;
    const nextCursor = hasMore
      ? Buffer.from(items[items.length - 1].createdAt.toISOString()).toString(
          'base64',
        )
      : null;

    return { items: items.map((f) => f.followee), nextCursor };
  }

  async searchUsers(
    query: string,
    cursor?: string,
    limit = 10,
    viewerId?: string,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = cursor
      ? Buffer.from(cursor, 'base64').toString('utf8')
      : undefined;

    const users = await this.prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { handle: { contains: query, mode: 'insensitive' } },
          { displayName: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: [{ handle: 'asc' }, { id: 'asc' }],
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      select: { id: true, handle: true, displayName: true, avatarUrl: true },
    });

    const hasMore = users.length > take;
    const rows = hasMore ? users.slice(0, take) : users;
    const nextCursor = hasMore
      ? Buffer.from(rows[rows.length - 1].id).toString('base64')
      : null;

    const followedIds =
      viewerId && rows.length > 0
        ? new Set(
            (
              await this.prisma.follow.findMany({
                where: {
                  followerId: viewerId,
                  followeeId: { in: rows.map((r) => r.id) },
                },
                select: { followeeId: true },
              })
            ).map((f) => f.followeeId),
          )
        : new Set<string>();

    const items = rows.map((r) => ({
      ...r,
      isFollowing: followedIds.has(r.id),
    }));

    return { items, nextCursor };
  }

  followExists(followerId: string, followeeId: string) {
    return this.prisma.follow.findUnique({
      where: { followerId_followeeId: { followerId, followeeId } },
    });
  }

  createFollow(followerId: string, followeeId: string) {
    return this.prisma.follow.create({ data: { followerId, followeeId } });
  }

  deleteFollow(followerId: string, followeeId: string) {
    return this.prisma.follow.delete({
      where: { followerId_followeeId: { followerId, followeeId } },
    });
  }
}
