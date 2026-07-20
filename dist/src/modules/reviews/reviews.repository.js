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
import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { decodeIdCursor, paginate, } from '../common/pagination/id-cursor.util.js';
let ReviewsRepository = class ReviewsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAlbumByDeezerId(deezerId) {
        return this.prisma.album.findUniqueOrThrow({ where: { deezerId } });
    }
    findTrackByDeezerId(deezerId) {
        return this.prisma.track.findUniqueOrThrow({ where: { deezerId } });
    }
    findTracksByDeezerIds(deezerIds) {
        return this.prisma.track.findMany({
            where: { deezerId: { in: deezerIds } },
        });
    }
    findUserIdByHandle(handle) {
        return this.prisma.user.findUniqueOrThrow({
            where: { handle },
            select: { id: true },
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
    createTrackReview(data) {
        return this.prisma.$transaction(async (tx) => {
            const review = await tx.review.create({
                data: {
                    userId: data.userId,
                    type: 'TRACK',
                    trackId: data.trackId,
                    description: data.description,
                    rating: new Prisma.Decimal(data.rating.toFixed(2)),
                    externalTitle: data.externalTitle,
                    externalArtistName: data.externalArtistName,
                    externalCoverUrl: data.externalCoverUrl,
                },
            });
            await tx.track.update({
                where: { id: data.trackId },
                data: { reviewCount: { increment: 1 } },
            });
            await tx.artist.update({
                where: { id: data.artistId },
                data: { reviewCount: { increment: 1 } },
            });
            return review;
        });
    }
    createAlbumReview(data) {
        return this.prisma.$transaction(async (tx) => {
            const review = await tx.review.create({
                data: {
                    userId: data.userId,
                    type: 'ALBUM',
                    albumId: data.albumId,
                    description: data.description,
                    rating: new Prisma.Decimal(data.rating.toFixed(2)),
                    externalTitle: data.externalTitle,
                    externalArtistName: data.externalArtistName,
                    externalCoverUrl: data.externalCoverUrl,
                },
            });
            await tx.trackReviewItem.createMany({
                data: data.items.map((item) => ({
                    reviewId: review.id,
                    trackId: item.trackId,
                    rating: new Prisma.Decimal(item.rating.toFixed(2)),
                    description: item.description ?? null,
                    position: item.position,
                })),
            });
            await tx.album.update({
                where: { id: data.albumId },
                data: { reviewCount: { increment: 1 } },
            });
            await tx.artist.update({
                where: { id: data.artistId },
                data: { reviewCount: { increment: 1 } },
            });
            return review;
        });
    }
    findById(id) {
        return this.prisma.review.findUnique({
            where: { id },
            include: {
                trackReviewItems: {
                    orderBy: { position: 'asc' },
                    include: {
                        track: {
                            select: { deezerId: true, title: true, trackNumber: true },
                        },
                    },
                },
                album: { select: { deezerId: true } },
                track: { select: { deezerId: true } },
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
    }
    updateTrackReview(id, data) {
        return this.prisma.review.update({
            where: { id },
            data: {
                ...(data.description !== undefined && {
                    description: data.description,
                }),
                ...(data.rating !== undefined && {
                    rating: new Prisma.Decimal(data.rating.toFixed(2)),
                }),
            },
        });
    }
    updateAlbumReviewItems(reviewId, description, rating, items) {
        return this.prisma.$transaction(async (tx) => {
            await tx.trackReviewItem.deleteMany({ where: { reviewId } });
            await tx.trackReviewItem.createMany({
                data: items.map((item) => ({
                    reviewId,
                    trackId: item.trackId,
                    rating: new Prisma.Decimal(item.rating.toFixed(2)),
                    description: item.description ?? null,
                    position: item.position,
                })),
            });
            return tx.review.update({
                where: { id: reviewId },
                data: {
                    ...(description !== undefined && { description }),
                    rating: new Prisma.Decimal(rating.toFixed(2)),
                },
            });
        });
    }
    updateAlbumReviewDescription(id, description) {
        return this.prisma.review.update({ where: { id }, data: { description } });
    }
    softDelete(id, type, trackId, albumId) {
        return this.prisma.$transaction(async (tx) => {
            const review = await tx.review.update({
                where: { id },
                data: { status: 'DELETED', deletedAt: new Date() },
            });
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
            return review;
        });
    }
    async listByAlbum(albumId, cursor, limit, sort, viewerId) {
        const take = Math.min(limit, 50);
        const cursorId = decodeIdCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: {
                albumId,
                type: 'ALBUM',
                status: 'ACTIVE',
                deletedAt: null,
                description: { not: null },
                ...this.buildVisibilityFilter(viewerId),
            },
            orderBy: this.buildOrderBy(sort),
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
        return paginate(reviews, take);
    }
    async listByTrack(trackId, cursor, limit, sort, viewerId) {
        const take = Math.min(limit, 50);
        const cursorId = decodeIdCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: {
                trackId,
                type: 'TRACK',
                status: 'ACTIVE',
                deletedAt: null,
                description: { not: null },
                ...this.buildVisibilityFilter(viewerId),
            },
            orderBy: this.buildOrderBy(sort),
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
        return paginate(reviews, take);
    }
    buildVisibilityFilter(viewerId) {
        if (!viewerId)
            return { user: { isPrivate: false } };
        return {
            OR: [
                { user: { isPrivate: false } },
                { userId: viewerId },
                { user: { followers: { some: { followerId: viewerId } } } },
            ],
        };
    }
    async listByUserId(userId, cursor, limit, sort, textQuery) {
        const take = Math.min(limit, 50);
        const cursorId = decodeIdCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: {
                userId,
                status: 'ACTIVE',
                deletedAt: null,
                ...(textQuery && {
                    OR: [
                        { externalTitle: { contains: textQuery, mode: 'insensitive' } },
                        {
                            externalArtistName: { contains: textQuery, mode: 'insensitive' },
                        },
                    ],
                }),
            },
            orderBy: this.buildUserReviewsOrderBy(sort),
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: { user: { select: { avatarUrl: true } } },
        });
        return paginate(reviews, take);
    }
    buildOrderBy(sort) {
        return sort === 'rating'
            ? [
                { rating: 'desc' },
                { createdAt: 'desc' },
                { id: 'desc' },
            ]
            : [{ createdAt: 'desc' }, { id: 'desc' }];
    }
    buildUserReviewsOrderBy(sort) {
        switch (sort) {
            case 'oldest':
                return [{ createdAt: 'asc' }, { id: 'asc' }];
            case 'best':
                return [
                    { rating: 'desc' },
                    { createdAt: 'desc' },
                    { id: 'desc' },
                ];
            case 'worst':
                return [
                    { rating: 'asc' },
                    { createdAt: 'asc' },
                    { id: 'asc' },
                ];
            default:
                return [{ createdAt: 'desc' }, { id: 'desc' }];
        }
    }
};
ReviewsRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReviewsRepository);
export { ReviewsRepository };
//# sourceMappingURL=reviews.repository.js.map