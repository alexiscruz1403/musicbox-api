import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByHandle(handle: string) {
    return this.prisma.user.findUnique({ where: { handle } });
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
    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          email: `deleted_${userId}@musicbox.invalid`,
          handle: `deleted_${userId}`,
          displayName: '[usuario eliminado]',
          passwordHash: null,
          googleId: null,
          avatarUrl: null,
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
  }

  updateAvatarUrl(userId: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
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
