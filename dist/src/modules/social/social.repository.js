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
let SocialRepository = class SocialRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getReviewStats(reviewIds, viewerId) {
        const stats = new Map(reviewIds.map((id) => [
            id,
            {
                likesCount: 0,
                dislikesCount: 0,
                commentsCount: 0,
                userReaction: null,
            },
        ]));
        if (reviewIds.length === 0)
            return stats;
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
            const entry = stats.get(g.reviewId);
            if (g.type === 'LIKE')
                entry.likesCount = g._count;
            else
                entry.dislikesCount = g._count;
        }
        for (const g of commentGroups) {
            stats.get(g.reviewId).commentsCount = g._count;
        }
        for (const r of viewerReactions) {
            stats.get(r.reviewId).userReaction = r.type;
        }
        return stats;
    }
    getActiveReviewOwner(reviewId) {
        return this.prisma.review.findFirst({
            where: { id: reviewId, deletedAt: null, status: 'ACTIVE' },
            select: { id: true, userId: true },
        });
    }
    async isOwnerVisibleTo(ownerId, viewerId) {
        if (viewerId === ownerId)
            return true;
        const owner = await this.prisma.user.findUnique({
            where: { id: ownerId },
            select: { isPrivate: true },
        });
        if (!owner?.isPrivate)
            return true;
        if (!viewerId)
            return false;
        const follow = await this.prisma.follow.findUnique({
            where: {
                followerId_followeeId: { followerId: viewerId, followeeId: ownerId },
            },
        });
        return !!follow;
    }
    findReaction(userId, reviewId) {
        return this.prisma.reviewReaction.findUnique({
            where: { userId_reviewId: { userId, reviewId } },
        });
    }
    upsertReaction(userId, reviewId, type) {
        return this.prisma.reviewReaction.upsert({
            where: { userId_reviewId: { userId, reviewId } },
            create: { userId, reviewId, type },
            update: { type },
        });
    }
    deleteReaction(userId, reviewId) {
        return this.prisma.reviewReaction.delete({
            where: { userId_reviewId: { userId, reviewId } },
        });
    }
    createComment(data) {
        return this.prisma.comment.create({ data });
    }
    findCommentById(id) {
        return this.prisma.comment.findUnique({ where: { id } });
    }
    updateComment(id, content) {
        return this.prisma.comment.update({ where: { id }, data: { content } });
    }
    softDeleteComment(id) {
        return this.prisma.comment.update({
            where: { id },
            data: { status: 'DELETED', deletedAt: new Date() },
        });
    }
    async listComments(reviewId, cursor, limit) {
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
SocialRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SocialRepository);
export { SocialRepository };
//# sourceMappingURL=social.repository.js.map