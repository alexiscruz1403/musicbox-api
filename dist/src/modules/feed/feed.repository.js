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
import { decodeIdCursor, paginate, } from '../common/pagination/id-cursor.util.js';
const REVIEW_USER_INCLUDE = {
    user: {
        select: { id: true, handle: true, displayName: true, avatarUrl: true },
    },
};
let FeedRepository = class FeedRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listFeed(userId, cursor, limit) {
        const take = Math.min(limit, 50);
        const cursorId = decodeIdCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: {
                deletedAt: null,
                status: 'ACTIVE',
                user: { followers: { some: { followerId: userId } } },
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: REVIEW_USER_INCLUDE,
        });
        return paginate(reviews, take);
    }
    async getFollowedIds(userId) {
        const rows = await this.prisma.follow.findMany({
            where: { followerId: userId },
            select: { followeeId: true },
        });
        return rows.map((r) => r.followeeId);
    }
    getOwnReviewSignals(userId) {
        return this.prisma.review.findMany({
            where: { userId, status: 'ACTIVE', deletedAt: null },
            select: {
                albumId: true,
                trackId: true,
                album: { select: { artistId: true } },
                track: { select: { artistId: true } },
            },
        });
    }
    async getTodaysCandidateIds(excludeUserIds, since) {
        const rows = await this.prisma.review.findMany({
            where: {
                deletedAt: null,
                status: 'ACTIVE',
                userId: { notIn: excludeUserIds },
                createdAt: { gte: since },
            },
            select: { id: true },
        });
        return rows.map((r) => r.id);
    }
    countLikesByReviewIds(reviewIds) {
        if (reviewIds.length === 0)
            return Promise.resolve([]);
        return this.prisma.reviewReaction.groupBy({
            by: ['reviewId'],
            where: { reviewId: { in: reviewIds }, type: 'LIKE' },
            _count: true,
        });
    }
    countCommentsByReviewIds(reviewIds) {
        if (reviewIds.length === 0)
            return Promise.resolve([]);
        return this.prisma.comment.groupBy({
            by: ['reviewId'],
            where: { reviewId: { in: reviewIds }, status: 'ACTIVE', deletedAt: null },
            _count: true,
        });
    }
    findSimilarReviews(params) {
        const { excludeUserIds, albumIds, trackIds, artistIds, cursorId, take } = params;
        const or = this.buildSignalOr(albumIds, trackIds, artistIds);
        if (or.length === 0)
            return Promise.resolve([]);
        return this.prisma.review.findMany({
            where: {
                deletedAt: null,
                status: 'ACTIVE',
                userId: { notIn: excludeUserIds },
                OR: or,
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: REVIEW_USER_INCLUDE,
        });
    }
    findTrendingReviews(params) {
        const { excludeUserIds, albumIds, trackIds, artistIds, trendingIds, cursorId, take, } = params;
        if (trendingIds.length === 0)
            return Promise.resolve([]);
        const or = this.buildSignalOr(albumIds, trackIds, artistIds);
        return this.prisma.review.findMany({
            where: {
                deletedAt: null,
                status: 'ACTIVE',
                userId: { notIn: excludeUserIds },
                id: { in: trendingIds },
                ...(or.length > 0 && { NOT: { OR: or } }),
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: REVIEW_USER_INCLUDE,
        });
    }
    findRandomReviews(params) {
        const { excludeUserIds, albumIds, trackIds, artistIds, trendingIds, cursorId, take, } = params;
        const or = this.buildSignalOr(albumIds, trackIds, artistIds);
        return this.prisma.review.findMany({
            where: {
                deletedAt: null,
                status: 'ACTIVE',
                userId: { notIn: excludeUserIds },
                ...(trendingIds.length > 0 && { id: { notIn: trendingIds } }),
                ...(or.length > 0 && { NOT: { OR: or } }),
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: REVIEW_USER_INCLUDE,
        });
    }
    buildSignalOr(albumIds, trackIds, artistIds) {
        const or = [];
        if (albumIds.length)
            or.push({ albumId: { in: albumIds } });
        if (trackIds.length)
            or.push({ trackId: { in: trackIds } });
        if (artistIds.length)
            or.push({ album: { artistId: { in: artistIds } } });
        if (artistIds.length)
            or.push({ track: { artistId: { in: artistIds } } });
        return or;
    }
};
FeedRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FeedRepository);
export { FeedRepository };
//# sourceMappingURL=feed.repository.js.map