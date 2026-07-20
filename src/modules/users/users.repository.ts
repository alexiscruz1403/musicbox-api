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
          email: `deleted_${userId}@vinlyst.invalid`,
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
      // anonimize() never hard-deletes the User row, so PushSubscription's
      // onDelete: Cascade never fires here — without this, a "deleted"
      // account's old devices would keep receiving push indefinitely.
      this.prisma.pushSubscription.deleteMany({ where: { userId } }),
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
}
