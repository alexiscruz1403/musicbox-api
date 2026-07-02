import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { Prisma } from '../../../generated/prisma/client.js';
import { CatalogService } from '../catalog/catalog.service.js';
import type { CatalogAlbum } from '../catalog/providers/music-catalog.provider.js';
import { ReviewEventsProducer } from '../events/review-events.producer.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
import type { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import type { ListUserReviewsQueryDto } from './dto/list-user-reviews-query.dto.js';
import type { TrackReviewItemDto } from './dto/track-review-item.dto.js';
import type { UpdateReviewDto } from './dto/update-review.dto.js';
import type { AlbumReviewItemInput } from './reviews.repository.js';
import { ReviewsRepository } from './reviews.repository.js';

const SANITIZE_OPTIONS = { allowedTags: [], allowedAttributes: {} };

@Injectable()
export class ReviewsService {
  constructor(
    private readonly repo: ReviewsRepository,
    private readonly catalog: CatalogService,
    private readonly events: ReviewEventsProducer,
  ) {}

  async create(userId: string, dto: CreateReviewDto) {
    const description = sanitizeHtml(dto.description, SANITIZE_OPTIONS);

    if (dto.type === 'TRACK') {
      return this.createTrackReview(
        userId,
        dto.deezerId,
        description,
        dto.rating!,
      );
    }
    return this.createAlbumReview(
      userId,
      dto.deezerId,
      description,
      dto.trackItems!,
    );
  }

  private async createTrackReview(
    userId: string,
    deezerId: string,
    description: string,
    rating: number,
  ) {
    const track = await this.catalog.getTrack(deezerId);
    const trackRow = await this.repo.findTrackByDeezerId(deezerId);
    try {
      const review = await this.repo.createTrackReview({
        userId,
        trackId: trackRow.id,
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
    } catch (e) {
      throw this.translatePrismaError(e);
    }
  }

  private async createAlbumReview(
    userId: string,
    deezerId: string,
    description: string,
    trackItems: TrackReviewItemDto[],
  ) {
    const album = await this.catalog.getAlbum(deezerId);
    const albumRow = await this.repo.findAlbumByDeezerId(deezerId);
    const items = await this.buildAlbumReviewItems(album, trackItems);
    const rating = this.computeAverageRating(items.map((i) => i.rating));

    try {
      const review = await this.repo.createAlbumReview({
        userId,
        albumId: albumRow.id,
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
    } catch (e) {
      throw this.translatePrismaError(e);
    }
  }

  private async buildAlbumReviewItems(
    album: CatalogAlbum,
    trackItems: TrackReviewItemDto[],
  ): Promise<AlbumReviewItemInput[]> {
    const albumTracksByDeezerId = new Map(
      album.tracks.map((t) => [t.deezerId, t]),
    );
    for (const item of trackItems) {
      if (!albumTracksByDeezerId.has(item.deezerId)) {
        throw new BadRequestException({
          code: 'TRACK_NOT_IN_ALBUM',
          message: `El track ${item.deezerId} no pertenece a este álbum.`,
        });
      }
    }

    const trackRows = await this.repo.findTracksByDeezerIds(
      trackItems.map((i) => i.deezerId),
    );
    const trackIdByDeezerId = new Map(trackRows.map((t) => [t.deezerId, t.id]));

    return trackItems.map((item, index) => {
      const albumTrack = albumTracksByDeezerId.get(item.deezerId)!;
      return {
        trackId: trackIdByDeezerId.get(item.deezerId)!,
        rating: item.rating,
        description: item.description
          ? sanitizeHtml(item.description, SANITIZE_OPTIONS)
          : undefined,
        // Falls back to the item's position within this review (not the album's
        // tracklist) when Deezer doesn't report track_position — keeps ordering
        // stable per-review instead of colliding every item on the same 0.
        position: albumTrack.trackNumber ?? index + 1,
      };
    });
  }

  async findById(id: string) {
    const review = await this.getActiveReview(id);
    const reactionGroups = await this.repo.findReactionBreakdown(id);
    const reactionStats = {
      likes: reactionGroups.find((g) => g.type === 'LIKE')?._count ?? 0,
      dislikes: reactionGroups.find((g) => g.type === 'DISLIKE')?._count ?? 0,
    };
    return { ...review, reactionStats };
  }

  async update(userId: string, id: string, dto: UpdateReviewDto) {
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
      const album = await this.catalog.getAlbum(review.album!.deezerId);
      const items = await this.buildAlbumReviewItems(album, dto.trackItems);
      const rating = this.computeAverageRating(items.map((i) => i.rating));
      await this.repo.updateAlbumReviewItems(id, description, rating, items);
    } else if (description !== undefined) {
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

  async remove(userId: string, id: string) {
    const review = await this.getOwnedActiveReview(userId, id);
    await this.repo.softDelete(id);
    await this.events.emitDeleted({
      reviewId: id,
      userId,
      type: review.type,
      albumId: review.albumId,
      trackId: review.trackId,
    });
  }

  async listByAlbum(deezerId: string, query: ListReviewsQueryDto) {
    const album = await this.findAlbumOrThrow(deezerId);
    return this.repo.listByAlbum(
      album.id,
      query.cursor,
      query.limit,
      query.sort,
    );
  }

  async listByTrack(deezerId: string, query: ListReviewsQueryDto) {
    const track = await this.findTrackOrThrow(deezerId);
    return this.repo.listByTrack(
      track.id,
      query.cursor,
      query.limit,
      query.sort,
    );
  }

  async listByUserHandle(handle: string, query: ListUserReviewsQueryDto) {
    const user = await this.repo.findUserIdByHandle(handle).catch(() => {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });
    });
    const result = await this.repo.listByUserId(
      user.id,
      query.cursor,
      query.limit,
    );
    return {
      items: result.items.map(({ user: reviewUser, ...review }) => ({
        ...review,
        avatarUrl: reviewUser.avatarUrl,
      })),
      nextCursor: result.nextCursor,
    };
  }

  private async findAlbumOrThrow(deezerId: string) {
    return this.repo.findAlbumByDeezerId(deezerId).catch(() => {
      throw new NotFoundException({
        code: 'ALBUM_NOT_FOUND',
        message: 'Álbum no encontrado.',
      });
    });
  }

  private async findTrackOrThrow(deezerId: string) {
    return this.repo.findTrackByDeezerId(deezerId).catch(() => {
      throw new NotFoundException({
        code: 'TRACK_NOT_FOUND',
        message: 'Track no encontrado.',
      });
    });
  }

  private async getActiveReview(id: string) {
    const review = await this.repo.findById(id);
    if (!review || review.deletedAt || review.status !== 'ACTIVE') {
      throw new NotFoundException({
        code: 'REVIEW_NOT_FOUND',
        message: 'Reseña no encontrada.',
      });
    }
    return review;
  }

  private async getOwnedActiveReview(userId: string, id: string) {
    const review = await this.getActiveReview(id);
    if (review.userId !== userId) {
      throw new ForbiddenException({
        code: 'NOT_REVIEW_OWNER',
        message: 'No puedes modificar esta reseña.',
      });
    }
    return review;
  }

  /** Rounds half-away-from-zero to 1 decimal, matching the Review.rating Decimal(3,1) column. */
  private computeAverageRating(ratings: number[]): number {
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return Number(avg.toFixed(1));
  }

  private translatePrismaError(e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return new ConflictException({
        code: 'REVIEW_ALREADY_EXISTS',
        message: 'Ya existe una reseña de este recurso para este usuario.',
      });
    }
    return e;
  }
}
