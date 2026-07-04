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
    createTrackReview(data) {
        return this.prisma.review.create({
            data: {
                userId: data.userId,
                type: 'TRACK',
                trackId: data.trackId,
                description: data.description,
                rating: new Prisma.Decimal(data.rating.toFixed(1)),
                externalTitle: data.externalTitle,
                externalArtistName: data.externalArtistName,
                externalCoverUrl: data.externalCoverUrl,
            },
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
                    rating: new Prisma.Decimal(data.rating.toFixed(1)),
                    externalTitle: data.externalTitle,
                    externalArtistName: data.externalArtistName,
                    externalCoverUrl: data.externalCoverUrl,
                },
            });
            await tx.trackReviewItem.createMany({
                data: data.items.map((item) => ({
                    reviewId: review.id,
                    trackId: item.trackId,
                    rating: item.rating,
                    description: item.description ?? null,
                    position: item.position,
                })),
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
                    rating: new Prisma.Decimal(data.rating.toFixed(1)),
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
                    rating: item.rating,
                    description: item.description ?? null,
                    position: item.position,
                })),
            });
            return tx.review.update({
                where: { id: reviewId },
                data: {
                    ...(description !== undefined && { description }),
                    rating: new Prisma.Decimal(rating.toFixed(1)),
                },
            });
        });
    }
    updateAlbumReviewDescription(id, description) {
        return this.prisma.review.update({ where: { id }, data: { description } });
    }
    softDelete(id) {
        return this.prisma.review.update({
            where: { id },
            data: { status: 'DELETED', deletedAt: new Date() },
        });
    }
    async listByAlbum(albumId, cursor, limit, sort) {
        const take = Math.min(limit, 50);
        const cursorId = this.decodeCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: {
                albumId,
                type: 'ALBUM',
                status: 'ACTIVE',
                deletedAt: null,
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
        return this.paginate(reviews, take);
    }
    async listByTrack(trackId, cursor, limit, sort) {
        const take = Math.min(limit, 50);
        const cursorId = this.decodeCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: {
                trackId,
                type: 'TRACK',
                status: 'ACTIVE',
                deletedAt: null,
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
        return this.paginate(reviews, take);
    }
    async listByUserId(userId, cursor, limit) {
        const take = Math.min(limit, 50);
        const cursorId = this.decodeCursor(cursor);
        const reviews = await this.prisma.review.findMany({
            where: { userId, status: 'ACTIVE', deletedAt: null },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: { user: { select: { avatarUrl: true } } },
        });
        return this.paginate(reviews, take);
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
ReviewsRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReviewsRepository);
export { ReviewsRepository };
//# sourceMappingURL=reviews.repository.js.map