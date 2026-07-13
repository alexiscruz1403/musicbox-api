import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface ReviewStats {
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  userReaction: 'LIKE' | 'DISLIKE' | null;
}

@Injectable()
export class SocialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getReviewStats(
    reviewIds: string[],
    viewerId?: string,
  ): Promise<Map<string, ReviewStats>> {
    const stats = new Map<string, ReviewStats>(
      reviewIds.map((id) => [
        id,
        {
          likesCount: 0,
          dislikesCount: 0,
          commentsCount: 0,
          userReaction: null,
        },
      ]),
    );
    if (reviewIds.length === 0) return stats;

    const [reactionGroups, commentGroups, viewerReactions] = await Promise.all([
      this.prisma.reviewReaction.groupBy({
        by: ['reviewId', 'type'],
        where: { reviewId: { in: reviewIds } },
        _count: true,
      }),
      this.prisma.comment.groupBy({
        by: ['reviewId'],
        where: {
          reviewId: { in: reviewIds },
          status: 'ACTIVE',
          deletedAt: null,
        },
        _count: true,
      }),
      viewerId
        ? this.prisma.reviewReaction.findMany({
            where: { reviewId: { in: reviewIds }, userId: viewerId },
            select: { reviewId: true, type: true },
          })
        : Promise.resolve([]),
    ]);

    for (const g of reactionGroups) {
      const entry = stats.get(g.reviewId)!;
      if (g.type === 'LIKE') entry.likesCount = g._count;
      else entry.dislikesCount = g._count;
    }
    for (const g of commentGroups) {
      stats.get(g.reviewId)!.commentsCount = g._count;
    }
    for (const r of viewerReactions) {
      stats.get(r.reviewId)!.userReaction = r.type;
    }
    return stats;
  }

  getActiveReviewOwner(reviewId: string) {
    return this.prisma.review.findFirst({
      where: { id: reviewId, deletedAt: null, status: 'ACTIVE' },
      select: { id: true, userId: true },
    });
  }

  // Mismo criterio que ReviewsRepository.isOwnerVisibleTo — duplicado
  // deliberadamente en vez de importar ReviewsModule/UsersModule (cada
  // repositorio de este proyecto consulta Prisma directo, sin acoplar
  // módulos entre sí para chequeos chicos como este).
  async isOwnerVisibleTo(ownerId: string, viewerId?: string): Promise<boolean> {
    if (viewerId === ownerId) return true;
    const owner = await this.prisma.user.findUnique({
      where: { id: ownerId },
      select: { isPrivate: true },
    });
    if (!owner?.isPrivate) return true;
    if (!viewerId) return false;
    const follow = await this.prisma.follow.findUnique({
      where: {
        followerId_followeeId: { followerId: viewerId, followeeId: ownerId },
      },
    });
    return !!follow;
  }

  findReaction(userId: string, reviewId: string) {
    return this.prisma.reviewReaction.findUnique({
      where: { userId_reviewId: { userId, reviewId } },
    });
  }

  upsertReaction(userId: string, reviewId: string, type: 'LIKE' | 'DISLIKE') {
    return this.prisma.reviewReaction.upsert({
      where: { userId_reviewId: { userId, reviewId } },
      create: { userId, reviewId, type },
      update: { type },
    });
  }

  deleteReaction(userId: string, reviewId: string) {
    return this.prisma.reviewReaction.delete({
      where: { userId_reviewId: { userId, reviewId } },
    });
  }

  createComment(data: { userId: string; reviewId: string; content: string }) {
    return this.prisma.comment.create({ data });
  }

  findCommentById(id: string) {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  updateComment(id: string, content: string) {
    return this.prisma.comment.update({ where: { id }, data: { content } });
  }

  softDeleteComment(id: string) {
    return this.prisma.comment.update({
      where: { id },
      data: { status: 'DELETED', deletedAt: new Date() },
    });
  }

  async listComments(
    reviewId: string,
    cursor: string | undefined,
    limit: number,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = this.decodeCursor(cursor);
    const comments = await this.prisma.comment.findMany({
      where: { reviewId, status: 'ACTIVE', deletedAt: null },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: {
        user: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
    return this.paginate(comments, take);
  }

  private decodeCursor(cursor?: string): string | undefined {
    return cursor ? Buffer.from(cursor, 'base64').toString('utf8') : undefined;
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
