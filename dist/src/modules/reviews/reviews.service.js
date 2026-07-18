var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { Prisma } from '../../../generated/prisma/client.js';
import { CatalogService } from '../catalog/catalog.service.js';
import { ReviewEventsProducer } from '../events/review-events.producer.js';
import { SocialService } from '../social/social.service.js';
import { ReviewsRepository } from './reviews.repository.js';
const SANITIZE_OPTIONS = { allowedTags: [], allowedAttributes: {} };
let ReviewsService = class ReviewsService {
    repo;
    catalog;
    events;
    social;
    constructor(repo, catalog, events, social) {
        this.repo = repo;
        this.catalog = catalog;
        this.events = events;
        this.social = social;
    }
    async create(userId, dto) {
        const description = dto.description
            ? sanitizeHtml(dto.description, SANITIZE_OPTIONS)
            : null;
        if (dto.type === 'TRACK') {
            return this.createTrackReview(userId, dto.deezerId, description, dto.rating);
        }
        return this.createAlbumReview(userId, dto.deezerId, description, dto.trackItems);
    }
    async createTrackReview(userId, deezerId, description, rating) {
        const track = await this.catalog.getTrack(deezerId);
        const trackRow = await this.repo.findTrackByDeezerId(deezerId);
        try {
            const review = await this.repo.createTrackReview({
                userId,
                trackId: trackRow.id,
                artistId: trackRow.artistId,
                description,
                rating,
                externalTitle: track.title,
                externalArtistName: track.artist.name,
                externalCoverUrl: track.coverUrl,
            });
            await this.events.emitCreated({
                reviewId: review.id,
                userId,
                type: 'TRACK',
                trackId: trackRow.id,
                albumId: null,
            });
            return review;
        }
        catch (e) {
            throw this.translatePrismaError(e);
        }
    }
    async createAlbumReview(userId, deezerId, description, trackItems) {
        const album = await this.catalog.getAlbum(deezerId);
        const albumRow = await this.repo.findAlbumByDeezerId(deezerId);
        const items = await this.buildAlbumReviewItems(album, trackItems);
        const rating = this.computeAverageRating(items.map((i) => i.rating));
        try {
            const review = await this.repo.createAlbumReview({
                userId,
                albumId: albumRow.id,
                artistId: albumRow.artistId,
                description,
                rating,
                externalTitle: album.title,
                externalArtistName: album.artist.name,
                externalCoverUrl: album.coverUrl,
                items,
            });
            await this.events.emitCreated({
                reviewId: review.id,
                userId,
                type: 'ALBUM',
                albumId: albumRow.id,
                trackId: null,
            });
            return review;
        }
        catch (e) {
            throw this.translatePrismaError(e);
        }
    }
    async buildAlbumReviewItems(album, trackItems) {
        const albumTracksByDeezerId = new Map(album.tracks.map((t) => [t.deezerId, t]));
        for (const item of trackItems) {
            if (!albumTracksByDeezerId.has(item.deezerId)) {
                throw new BadRequestException({
                    code: 'TRACK_NOT_IN_ALBUM',
                    message: `El track ${item.deezerId} no pertenece a este álbum.`,
                });
            }
        }
        const trackRows = await this.repo.findTracksByDeezerIds(trackItems.map((i) => i.deezerId));
        const trackIdByDeezerId = new Map(trackRows.map((t) => [t.deezerId, t.id]));
        return trackItems.map((item, index) => {
            const albumTrack = albumTracksByDeezerId.get(item.deezerId);
            return {
                trackId: trackIdByDeezerId.get(item.deezerId),
                rating: item.rating,
                description: item.description
                    ? sanitizeHtml(item.description, SANITIZE_OPTIONS)
                    : undefined,
                position: albumTrack.trackNumber ?? index + 1,
            };
        });
    }
    async findById(id, viewerId) {
        const review = await this.getActiveReview(id);
        await this.assertOwnerVisible(review.userId, viewerId);
        const stats = await this.social.getReviewStats([id], viewerId);
        return { ...review, ...stats.get(id) };
    }
    async update(userId, id, dto) {
        const review = await this.getOwnedActiveReview(userId, id);
        if (review.type === 'TRACK') {
            if (dto.trackItems) {
                throw new BadRequestException({
                    code: 'INVALID_UPDATE_FOR_TYPE',
                    message: 'No se pueden enviar trackItems en una reseña de track.',
                });
            }
            const description = dto.description
                ? sanitizeHtml(dto.description, SANITIZE_OPTIONS)
                : undefined;
            await this.repo.updateTrackReview(id, {
                description,
                rating: dto.rating,
            });
            await this.events.emitUpdated({
                reviewId: id,
                userId,
                type: 'TRACK',
                trackId: review.trackId,
                albumId: null,
            });
            return this.repo.findById(id);
        }
        if (dto.rating !== undefined) {
            throw new BadRequestException({
                code: 'INVALID_UPDATE_FOR_TYPE',
                message: 'El rating de álbum se calcula automáticamente.',
            });
        }
        const description = dto.description
            ? sanitizeHtml(dto.description, SANITIZE_OPTIONS)
            : undefined;
        if (dto.trackItems) {
            const album = await this.catalog.getAlbum(review.album.deezerId);
            const items = await this.buildAlbumReviewItems(album, dto.trackItems);
            const rating = this.computeAverageRating(items.map((i) => i.rating));
            await this.repo.updateAlbumReviewItems(id, description, rating, items);
        }
        else if (description !== undefined) {
            await this.repo.updateAlbumReviewDescription(id, description);
        }
        await this.events.emitUpdated({
            reviewId: id,
            userId,
            type: 'ALBUM',
            albumId: review.albumId,
            trackId: null,
        });
        return this.repo.findById(id);
    }
    async remove(userId, id) {
        const review = await this.getOwnedReviewAllowDeleted(userId, id);
        if (review.deletedAt || review.status !== 'ACTIVE')
            return;
        await this.repo.softDelete(id, review.type, review.trackId, review.albumId);
        await this.events.emitDeleted({
            reviewId: id,
            userId,
            type: review.type,
            albumId: review.albumId,
            trackId: review.trackId,
        });
    }
    async listByAlbum(deezerId, query, viewerId) {
        const album = await this.findAlbumOrThrow(deezerId);
        const result = await this.repo.listByAlbum(album.id, query.cursor, query.limit, query.sort, viewerId);
        return this.withReviewStats(result, viewerId);
    }
    async listByTrack(deezerId, query, viewerId) {
        const track = await this.findTrackOrThrow(deezerId);
        const result = await this.repo.listByTrack(track.id, query.cursor, query.limit, query.sort, viewerId);
        return this.withReviewStats(result, viewerId);
    }
    async withReviewStats(result, viewerId) {
        const stats = await this.social.getReviewStats(result.items.map((r) => r.id), viewerId);
        return {
            items: result.items.map((r) => ({ ...r, ...stats.get(r.id) })),
            nextCursor: result.nextCursor,
        };
    }
    async listByUserHandle(handle, query, viewerId) {
        const user = await this.repo.findUserIdByHandle(handle).catch(() => {
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
                message: 'Usuario no encontrado.',
            });
        });
        await this.assertOwnerVisible(user.id, viewerId);
        const result = await this.repo.listByUserId(user.id, query.cursor, query.limit, query.sort, query.q);
        return {
            items: result.items.map(({ user: reviewUser, ...review }) => ({
                ...review,
                avatarUrl: reviewUser.avatarUrl,
            })),
            nextCursor: result.nextCursor,
        };
    }
    async findAlbumOrThrow(deezerId) {
        return this.repo.findAlbumByDeezerId(deezerId).catch(() => {
            throw new NotFoundException({
                code: 'ALBUM_NOT_FOUND',
                message: 'Álbum no encontrado.',
            });
        });
    }
    async findTrackOrThrow(deezerId) {
        return this.repo.findTrackByDeezerId(deezerId).catch(() => {
            throw new NotFoundException({
                code: 'TRACK_NOT_FOUND',
                message: 'Track no encontrado.',
            });
        });
    }
    async getActiveReview(id) {
        const review = await this.repo.findById(id);
        if (!review || review.deletedAt || review.status !== 'ACTIVE') {
            throw new NotFoundException({
                code: 'REVIEW_NOT_FOUND',
                message: 'Reseña no encontrada.',
            });
        }
        return review;
    }
    async getOwnedActiveReview(userId, id) {
        const review = await this.getActiveReview(id);
        if (review.userId !== userId) {
            throw new ForbiddenException({
                code: 'NOT_REVIEW_OWNER',
                message: 'No puedes modificar esta reseña.',
            });
        }
        return review;
    }
    async getOwnedReviewAllowDeleted(userId, id) {
        const review = await this.repo.findById(id);
        if (!review) {
            throw new NotFoundException({
                code: 'REVIEW_NOT_FOUND',
                message: 'Reseña no encontrada.',
            });
        }
        if (review.userId !== userId) {
            throw new ForbiddenException({
                code: 'NOT_REVIEW_OWNER',
                message: 'No puedes modificar esta reseña.',
            });
        }
        return review;
    }
    async assertOwnerVisible(ownerId, viewerId) {
        const visible = await this.repo.isOwnerVisibleTo(ownerId, viewerId);
        if (!visible) {
            throw new ForbiddenException({
                code: 'PRIVATE_PROFILE',
                message: 'Este perfil es privado.',
            });
        }
    }
    computeAverageRating(ratings) {
        const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        return Number(avg.toFixed(2));
    }
    translatePrismaError(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002') {
            return new ConflictException({
                code: 'REVIEW_ALREADY_EXISTS',
                message: 'Ya existe una reseña de este recurso para este usuario.',
            });
        }
        return e;
    }
};
ReviewsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ReviewsRepository,
        CatalogService,
        ReviewEventsProducer,
        SocialService])
], ReviewsService);
export { ReviewsService };
//# sourceMappingURL=reviews.service.js.map