var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let ModerationRepository = class ModerationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createReport(data) {
        return this.prisma.report.create({ data });
    }
    async targetExists(targetType, targetId) {
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
    findReportById(id) {
        return this.prisma.report.findUnique({ where: { id } });
    }
    async listReports(status, targetType, cursor, limit) {
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
    async hydrateReportedContent(reports) {
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
            reportedContent: this.buildReportedContent(report, reviewMap, commentMap, userMap),
        }));
    }
    buildReportedContent(report, reviewMap, commentMap, userMap) {
        switch (report.targetType) {
            case 'REVIEW': {
                const review = reviewMap.get(report.targetId);
                if (!review)
                    return null;
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
    updateReportStatus(id, status, reviewedById) {
        return this.prisma.report.update({
            where: { id },
            data: { status, reviewedById, reviewedAt: new Date() },
        });
    }
    findReviewOwner(id) {
        return this.prisma.review.findUnique({
            where: { id },
            select: {
                id: true,
                userId: true,
                status: true,
                type: true,
                trackId: true,
                albumId: true,
            },
        });
    }
    findCommentOwner(id) {
        return this.prisma.comment.findUnique({
            where: { id },
            select: { id: true, userId: true, status: true },
        });
    }
    async hideReviewIfActive(id, type, trackId, albumId) {
        await this.prisma.$transaction(async (tx) => {
            const result = await tx.review.updateMany({
                where: { id, status: 'ACTIVE' },
                data: { status: 'HIDDEN' },
            });
            if (result.count !== 1)
                return;
            if (type === 'TRACK') {
                const track = await tx.track.update({
                    where: { id: trackId },
                    data: { reviewCount: { decrement: 1 } },
                });
                await tx.artist.update({
                    where: { id: track.artistId },
                    data: { reviewCount: { decrement: 1 } },
                });
            }
            else {
                const album = await tx.album.update({
                    where: { id: albumId },
                    data: { reviewCount: { decrement: 1 } },
                });
                await tx.artist.update({
                    where: { id: album.artistId },
                    data: { reviewCount: { decrement: 1 } },
                });
            }
        });
    }
    async hideCommentIfActive(id) {
        await this.prisma.comment.updateMany({
            where: { id, status: 'ACTIVE' },
            data: { status: 'HIDDEN' },
        });
    }
    findActiveReview(id) {
        return this.prisma.review.findFirst({
            where: { id, status: 'ACTIVE', deletedAt: null },
        });
    }
    findActiveComment(id) {
        return this.prisma.comment.findFirst({
            where: { id, status: 'ACTIVE', deletedAt: null },
        });
    }
    findActiveUser(id) {
        return this.prisma.user.findFirst({
            where: { id, status: { not: 'DELETED' } },
        });
    }
    async incrementAcceptedReports(userId) {
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { acceptedReportsCount: { increment: 1 } },
            select: { acceptedReportsCount: true },
        });
        return updated.acceptedReportsCount;
    }
    applyTemporaryPenalty(userId, level) {
        const penalizedUntil = new Date(Date.now() + level * 24 * 60 * 60 * 1000);
        return this.prisma.user.update({
            where: { id: userId },
            data: { penalizedUntil, penaltyLevel: level },
        });
    }
    async suspendUser(id) {
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
    decodeCursor(cursor) {
        return cursor ? Buffer.from(cursor, 'base64').toString('utf8') : undefined;
    }
    paginate(rows, take) {
        const hasMore = rows.length > take;
        const items = hasMore ? rows.slice(0, take) : rows;
        const nextCursor = hasMore
            ? Buffer.from(items[items.length - 1].id).toString('base64')
            : null;
        return { items, nextCursor };
    }
};
ModerationRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ModerationRepository);
export { ModerationRepository };
//# sourceMappingURL=moderation.repository.js.map