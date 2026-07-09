import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

type ReportTargetType = 'REVIEW' | 'COMMENT' | 'USER';
type ReportStatus = 'PENDING' | 'REVIEWED' | 'DISMISSED';

export interface ReportedReviewContent {
  reviewType: 'TRACK' | 'ALBUM';
  description: string;
  trackDescriptions?: { trackTitle: string; description: string | null }[];
}

export type ReportedContent =
  | ReportedReviewContent
  | { content: string }
  | { handle: string }
  | null;

@Injectable()
export class ModerationRepository {
  constructor(private readonly prisma: PrismaService) {}

  createReport(data: {
    reporterId: string;
    targetType: ReportTargetType;
    targetId: string;
    reason: string;
  }) {
    return this.prisma.report.create({ data });
  }

  async targetExists(
    targetType: ReportTargetType,
    targetId: string,
  ): Promise<boolean> {
    switch (targetType) {
      case 'REVIEW':
        return !!(await this.prisma.review.findUnique({
          where: { id: targetId },
          select: { id: true },
        }));
      case 'COMMENT':
        return !!(await this.prisma.comment.findUnique({
          where: { id: targetId },
          select: { id: true },
        }));
      case 'USER':
        return !!(await this.prisma.user.findUnique({
          where: { id: targetId },
          select: { id: true },
        }));
    }
  }

  findReportById(id: string) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async listReports(
    status: ReportStatus | undefined,
    targetType: ReportTargetType | undefined,
    cursor: string | undefined,
    limit: number,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = this.decodeCursor(cursor);
    const reports = await this.prisma.report.findMany({
      where: { ...(status && { status }), ...(targetType && { targetType }) },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: {
        reporter: { select: { id: true, handle: true, displayName: true } },
      },
    });
    const { items, nextCursor } = this.paginate(reports, take);
    return { items: await this.hydrateReportedContent(items), nextCursor };
  }

  // Report.targetId no tiene FK polimórfica real — se resuelve el contenido
  // denunciado con 3 queries batcheadas (una por targetType), no una por
  // report, para evitar N+1 en una página de hasta 50 reportes mixtos.
  private async hydrateReportedContent<
    T extends { targetType: ReportTargetType; targetId: string },
  >(reports: T[]): Promise<(T & { reportedContent: ReportedContent })[]> {
    const reviewIds = reports
      .filter((r) => r.targetType === 'REVIEW')
      .map((r) => r.targetId);
    const commentIds = reports
      .filter((r) => r.targetType === 'COMMENT')
      .map((r) => r.targetId);
    const userIds = reports
      .filter((r) => r.targetType === 'USER')
      .map((r) => r.targetId);

    const [reviews, comments, users] = await Promise.all([
      reviewIds.length
        ? this.prisma.review.findMany({
            where: { id: { in: reviewIds } },
            select: {
              id: true,
              type: true,
              description: true,
              trackReviewItems: {
                orderBy: { position: 'asc' },
                select: {
                  description: true,
                  track: { select: { title: true } },
                },
              },
            },
          })
        : [],
      commentIds.length
        ? this.prisma.comment.findMany({
            where: { id: { in: commentIds } },
            select: { id: true, content: true },
          })
        : [],
      userIds.length
        ? this.prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, handle: true },
          })
        : [],
    ]);

    const reviewMap = new Map(reviews.map((r) => [r.id, r]));
    const commentMap = new Map(comments.map((c) => [c.id, c]));
    const userMap = new Map(users.map((u) => [u.id, u]));

    return reports.map((report) => ({
      ...report,
      reportedContent: this.buildReportedContent(
        report,
        reviewMap,
        commentMap,
        userMap,
      ),
    }));
  }

  private buildReportedContent(
    report: { targetType: ReportTargetType; targetId: string },
    reviewMap: Map<
      string,
      {
        type: 'TRACK' | 'ALBUM';
        description: string;
        trackReviewItems: {
          description: string | null;
          track: { title: string };
        }[];
      }
    >,
    commentMap: Map<string, { content: string }>,
    userMap: Map<string, { handle: string }>,
  ): ReportedContent {
    switch (report.targetType) {
      case 'REVIEW': {
        const review = reviewMap.get(report.targetId);
        if (!review) return null;
        if (review.type === 'TRACK') {
          return { reviewType: 'TRACK', description: review.description };
        }
        return {
          reviewType: 'ALBUM',
          description: review.description,
          trackDescriptions: review.trackReviewItems.map((item) => ({
            trackTitle: item.track.title,
            description: item.description,
          })),
        };
      }
      case 'COMMENT': {
        const comment = commentMap.get(report.targetId);
        return comment ? { content: comment.content } : null;
      }
      case 'USER': {
        const user = userMap.get(report.targetId);
        return user ? { handle: user.handle } : null;
      }
    }
  }

  updateReportStatus(
    id: string,
    status: 'REVIEWED' | 'DISMISSED',
    reviewedById: string,
  ) {
    return this.prisma.report.update({
      where: { id },
      data: { status, reviewedById, reviewedAt: new Date() },
    });
  }

  // Sin filtro de status/deletedAt — necesitamos el userId dueño aunque el
  // contenido ya esté oculto/borrado por otra vía.
  findReviewOwner(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
      select: { id: true, userId: true, status: true },
    });
  }

  findCommentOwner(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
      select: { id: true, userId: true, status: true },
    });
  }

  // Idempotente: no-op si el contenido ya no está ACTIVE (ocultado/borrado
  // por otra vía).
  async hideReviewIfActive(id: string): Promise<void> {
    await this.prisma.review.updateMany({
      where: { id, status: 'ACTIVE' },
      data: { status: 'HIDDEN' },
    });
  }

  async hideCommentIfActive(id: string): Promise<void> {
    await this.prisma.comment.updateMany({
      where: { id, status: 'ACTIVE' },
      data: { status: 'HIDDEN' },
    });
  }

  findActiveReview(id: string) {
    return this.prisma.review.findFirst({
      where: { id, status: 'ACTIVE', deletedAt: null },
    });
  }

  findActiveComment(id: string) {
    return this.prisma.comment.findFirst({
      where: { id, status: 'ACTIVE', deletedAt: null },
    });
  }

  findActiveUser(id: string) {
    return this.prisma.user.findFirst({
      where: { id, status: { not: 'DELETED' } },
    });
  }

  // Incremento atómico — Postgres serializa los UPDATE concurrentes sobre la
  // misma fila, así que cada aceptación de reporte observa un valor único.
  async incrementAcceptedReports(userId: string): Promise<number> {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { acceptedReportsCount: { increment: 1 } },
      select: { acceptedReportsCount: true },
    });
    return updated.acceptedReportsCount;
  }

  applyTemporaryPenalty(userId: string, level: number) {
    const penalizedUntil = new Date(Date.now() + level * 24 * 60 * 60 * 1000);
    return this.prisma.user.update({
      where: { id: userId },
      data: { penalizedUntil, penaltyLevel: level },
    });
  }

  async suspendUser(id: string) {
    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { status: 'SUSPENDED' },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId: id, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
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
