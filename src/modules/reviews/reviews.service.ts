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
import { SocialService } from '../social/social.service.js';
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
    private readonly social: SocialService,
  ) {}

  async create(userId: string, dto: CreateReviewDto) {
    const description = dto.description
      ? sanitizeHtml(dto.description, SANITIZE_OPTIONS)
      : null;

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
    description: string | null,
    rating: number,
  ) {
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
    } catch (e) {
      throw this.translatePrismaError(e);
    }
  }

  private async createAlbumReview(
    userId: string,
    deezerId: string,
    description: string | null,
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
          args: { deezerId: item.deezerId },
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

  async findById(id: string, viewerId?: string) {
    const review = await this.getActiveReview(id);
    await this.assertOwnerVisible(review.userId, viewerId);
    const stats = await this.social.getReviewStats([id], viewerId);
    return { ...review, ...stats.get(id)! };
  }

  async update(userId: string, id: string, dto: UpdateReviewDto) {
    const review = await this.getOwnedActiveReview(userId, id);

    if (review.type === 'TRACK') {
      if (dto.trackItems) {
        throw new BadRequestException({
          code: 'TRACK_ITEMS_NOT_ALLOWED',
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
        code: 'ALBUM_RATING_AUTO_CALCULATED',
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

  // Idempotent delete (unlike update, which stays strict): a client that
  // queued a delete offline and replays it after reconnecting may hit a
  // review it (or another device) already deleted. Already-deleted is
  // treated as "goal already achieved" (no-op success, no re-emitted event),
  // while ownership violations and unknown ids still fail loudly — see
  // docs/fase-8-features.md.
  async remove(userId: string, id: string) {
    const review = await this.getOwnedReviewAllowDeleted(userId, id);
    if (review.deletedAt || review.status !== 'ACTIVE') return;

    await this.repo.softDelete(id, review.type, review.trackId, review.albumId);
    await this.events.emitDeleted({
      reviewId: id,
      userId,
      type: review.type,
      albumId: review.albumId,
      trackId: review.trackId,
    });
  }

  async listByAlbum(
    deezerId: string,
    query: ListReviewsQueryDto,
    viewerId?: string,
  ) {
    const album = await this.findAlbumOrThrow(deezerId);
    const result = await this.repo.listByAlbum(
      album.id,
      query.cursor,
      query.limit,
      query.sort,
      viewerId,
    );
    return this.withReviewStats(result, viewerId);
  }

  async listByTrack(
    deezerId: string,
    query: ListReviewsQueryDto,
    viewerId?: string,
  ) {
    const track = await this.findTrackOrThrow(deezerId);
    const result = await this.repo.listByTrack(
      track.id,
      query.cursor,
      query.limit,
      query.sort,
      viewerId,
    );
    return this.withReviewStats(result, viewerId);
  }

  private async withReviewStats<T extends { id: string }>(
    result: { items: T[]; nextCursor: string | null },
    viewerId?: string,
  ) {
    const stats = await this.social.getReviewStats(
      result.items.map((r) => r.id),
      viewerId,
    );
    return {
      items: result.items.map((r) => ({ ...r, ...stats.get(r.id)! })),
      nextCursor: result.nextCursor,
    };
  }

  async listByUserHandle(
    handle: string,
    query: ListUserReviewsQueryDto,
    viewerId?: string,
  ) {
    const user = await this.repo.findUserIdByHandle(handle).catch(() => {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
      });
    });
    await this.assertOwnerVisible(user.id, viewerId);
    const result = await this.repo.listByUserId(
      user.id,
      query.cursor,
      query.limit,
      query.sort,
      query.q,
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
      });
    });
  }

  private async findTrackOrThrow(deezerId: string) {
    return this.repo.findTrackByDeezerId(deezerId).catch(() => {
      throw new NotFoundException({
        code: 'TRACK_NOT_FOUND',
      });
    });
  }

  private async getActiveReview(id: string) {
    const review = await this.repo.findById(id);
    if (!review || review.deletedAt || review.status !== 'ACTIVE') {
      throw new NotFoundException({
        code: 'REVIEW_NOT_FOUND',
      });
    }
    return review;
  }

  private async getOwnedActiveReview(userId: string, id: string) {
    const review = await this.getActiveReview(id);
    if (review.userId !== userId) {
      throw new ForbiddenException({
        code: 'NOT_REVIEW_OWNER',
      });
    }
    return review;
  }

  // Used only by remove(): unlike getOwnedActiveReview, does not reject an
  // already-deleted review — the caller decides what "already deleted" means
  // (a no-op, for delete). Ownership is still enforced regardless of
  // deletion state, so a non-owner can never learn "this review exists and
  // belongs to someone else" via a silent success.
  private async getOwnedReviewAllowDeleted(userId: string, id: string) {
    const review = await this.repo.findById(id);
    if (!review) {
      throw new NotFoundException({
        code: 'REVIEW_NOT_FOUND',
      });
    }
    if (review.userId !== userId) {
      throw new ForbiddenException({
        code: 'NOT_REVIEW_OWNER',
      });
    }
    return review;
  }

  // Perfil privado: solo el dueño o un seguidor aprobado pueden ver su
  // historial/detalle de reseñas (docs/fase-7-features.md, perfiles privados).
  private async assertOwnerVisible(ownerId: string, viewerId?: string) {
    const visible = await this.repo.isOwnerVisibleTo(ownerId, viewerId);
    if (!visible) {
      throw new ForbiddenException({
        code: 'PRIVATE_PROFILE',
      });
    }
  }

  // Rounds half-away-from-zero to 2 decimals, matching the Review.rating
  // Decimal(4,2) column. The average of quarter-point inputs (1, 1.25, ...)
  // isn't itself necessarily a quarter-point value (e.g. avg(8.25, 8.5, 9) =
  // 8.5833...), so this only rounds for display/storage precision — it does
  // not re-enforce the 0.25 granularity, which only applies to inputs.
  private computeAverageRating(ratings: number[]): number {
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return Number(avg.toFixed(2));
  }

  private translatePrismaError(e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return new ConflictException({
        code: 'REVIEW_ALREADY_EXISTS',
      });
    }
    return e;
  }
}
