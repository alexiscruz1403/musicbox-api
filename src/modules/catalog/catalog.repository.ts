import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  decodeIdCursor,
  encodeIdCursor,
} from '../common/pagination/id-cursor.util.js';
import type {
  CatalogAlbum,
  CatalogArtist,
  CatalogTrack,
} from './providers/music-catalog.provider.js';

export interface CatalogReviewGroup {
  id: string;
  reviewCount: number;
  avgRating: number;
}

export interface ResourceReviewStats {
  reviewCount: number;
  userRating: number | null;
}

export interface AlbumReviewStats extends ResourceReviewStats {
  // Keyed by track deezerId — only present if the viewer has their own
  // ACTIVE ALBUM review of this album (per-track ratings never fall back to
  // a standalone TRACK review of the same song, docs/fase-2-features.md).
  trackRatings: Map<string, number>;
}

// No real User.id will ever equal this sentinel — used so the `reviews`
// sub-select below always has a static shape (a real conditional `select`
// would make Prisma infer a misleading union return type), while still
// returning an empty array for anonymous/no-viewer requests.
const NO_VIEWER = '__no_viewer__';

@Injectable()
export class CatalogRepository {
  constructor(private readonly prisma: PrismaService) {}

  // reviewCount/userRating (docs/fase-2-features.md) — single indexed lookup
  // by the unique deezerId column, always read live (never cached), so a
  // review create/delete/hide is reflected on the very next request.
  async getAlbumStats(
    deezerId: string,
    userId?: string,
  ): Promise<AlbumReviewStats | null> {
    const album = await this.prisma.album.findUnique({
      where: { deezerId },
      select: {
        reviewCount: true,
        reviews: {
          where: {
            userId: userId ?? NO_VIEWER,
            type: 'ALBUM',
            status: 'ACTIVE',
            deletedAt: null,
          },
          take: 1,
          select: {
            rating: true,
            trackReviewItems: {
              select: { rating: true, track: { select: { deezerId: true } } },
            },
          },
        },
      },
    });
    if (!album) return null;
    const ownReview = album.reviews[0];
    return {
      reviewCount: album.reviewCount,
      userRating: ownReview ? Number(ownReview.rating) : null,
      trackRatings: new Map(
        (ownReview?.trackReviewItems ?? []).map((item) => [
          item.track.deezerId,
          Number(item.rating),
        ]),
      ),
    };
  }

  async getTrackStats(
    deezerId: string,
    userId?: string,
  ): Promise<ResourceReviewStats | null> {
    const track = await this.prisma.track.findUnique({
      where: { deezerId },
      select: {
        reviewCount: true,
        reviews: {
          where: {
            userId: userId ?? NO_VIEWER,
            type: 'TRACK',
            status: 'ACTIVE',
            deletedAt: null,
          },
          take: 1,
          select: { rating: true },
        },
      },
    });
    if (!track) return null;
    return {
      reviewCount: track.reviewCount,
      userRating: track.reviews[0] ? Number(track.reviews[0].rating) : null,
    };
  }

  getArtistStats(deezerId: string) {
    return this.prisma.artist.findUnique({
      where: { deezerId },
      select: { reviewCount: true },
    });
  }

  // Batch variants for GET /catalog/search (per-item enrichment across a
  // page of mixed artist/album/track results) — same select shape as the
  // single-resource methods above, keyed by deezerId to merge without N+1.
  async getAlbumStatsBatch(
    deezerIds: string[],
    userId?: string,
  ): Promise<Map<string, ResourceReviewStats>> {
    if (deezerIds.length === 0) return new Map();
    const rows = await this.prisma.album.findMany({
      where: { deezerId: { in: deezerIds } },
      select: {
        deezerId: true,
        reviewCount: true,
        reviews: {
          where: {
            userId: userId ?? NO_VIEWER,
            type: 'ALBUM',
            status: 'ACTIVE',
            deletedAt: null,
          },
          take: 1,
          select: { rating: true },
        },
      },
    });
    return new Map(
      rows.map((r) => [
        r.deezerId,
        {
          reviewCount: r.reviewCount,
          userRating: r.reviews[0] ? Number(r.reviews[0].rating) : null,
        },
      ]),
    );
  }

  async getTrackStatsBatch(
    deezerIds: string[],
    userId?: string,
  ): Promise<Map<string, ResourceReviewStats>> {
    if (deezerIds.length === 0) return new Map();
    const rows = await this.prisma.track.findMany({
      where: { deezerId: { in: deezerIds } },
      select: {
        deezerId: true,
        reviewCount: true,
        reviews: {
          where: {
            userId: userId ?? NO_VIEWER,
            type: 'TRACK',
            status: 'ACTIVE',
            deletedAt: null,
          },
          take: 1,
          select: { rating: true },
        },
      },
    });
    return new Map(
      rows.map((r) => [
        r.deezerId,
        {
          reviewCount: r.reviewCount,
          userRating: r.reviews[0] ? Number(r.reviews[0].rating) : null,
        },
      ]),
    );
  }

  async getArtistStatsBatch(
    deezerIds: string[],
  ): Promise<Map<string, { reviewCount: number }>> {
    if (deezerIds.length === 0) return new Map();
    const rows = await this.prisma.artist.findMany({
      where: { deezerId: { in: deezerIds } },
      select: { deezerId: true, reviewCount: true },
    });
    return new Map(
      rows.map((r) => [r.deezerId, { reviewCount: r.reviewCount }]),
    );
  }

  // NOTE: upsertArtist/upsertAlbum/upsertTrack below must never reference
  // reviewCount in their update/create payloads — it's maintained exclusively
  // by ReviewsRepository/ModerationRepository's increment/decrement calls.
  // Prisma leaves omitted fields untouched, so the nightly CatalogSyncService
  // re-sync (which calls these same upserts) can't accidentally reset it.
  upsertArtist(data: CatalogArtist) {
    const now = new Date();
    return this.prisma.artist.upsert({
      where: { deezerId: data.deezerId },
      update: { name: data.name, imageUrl: data.imageUrl, lastSyncedAt: now },
      create: {
        deezerId: data.deezerId,
        name: data.name,
        imageUrl: data.imageUrl,
        lastSyncedAt: now,
      },
    });
  }

  upsertAlbum(data: CatalogAlbum, artistId: string) {
    const now = new Date();
    const releaseDate = data.releaseDate ? new Date(data.releaseDate) : null;
    return this.prisma.album.upsert({
      where: { deezerId: data.deezerId },
      update: {
        title: data.title,
        coverUrl: data.coverUrl,
        releaseDate,
        genreLabel: data.genreLabel,
        lastSyncedAt: now,
      },
      create: {
        deezerId: data.deezerId,
        title: data.title,
        artistId,
        coverUrl: data.coverUrl,
        releaseDate,
        genreLabel: data.genreLabel,
        lastSyncedAt: now,
      },
    });
  }

  // catalogSyncedAt (not lastSyncedAt) tracks whether the *full* discography
  // has been walked — lastSyncedAt is also touched by partial upserts (e.g.
  // a lone getArtist() call), which would otherwise let a never-fully-synced
  // artist look "fresh" and get skipped by this scan.
  findStaleArtists(olderThan: Date, take: number) {
    return this.prisma.artist.findMany({
      where: {
        OR: [{ catalogSyncedAt: null }, { catalogSyncedAt: { lt: olderThan } }],
      },
      take,
    });
  }

  findArtistByDeezerId(deezerId: string) {
    return this.prisma.artist.findUnique({ where: { deezerId } });
  }

  // Used by CatalogService.getTrack() to link a track to its already-locally-
  // known album (by Deezer id) instead of unconditionally passing null —
  // null only when the album genuinely hasn't been persisted by anyone yet.
  async findAlbumIdByDeezerId(deezerId: string): Promise<string | null> {
    const album = await this.prisma.album.findUnique({
      where: { deezerId },
      select: { id: true },
    });
    return album?.id ?? null;
  }

  markCatalogSynced(artistId: string, when: Date) {
    return this.prisma.artist.update({
      where: { id: artistId },
      data: { catalogSyncedAt: when },
    });
  }

  async findTracksByArtist(
    artistId: string,
    cursor: string | null,
    limit: number,
  ) {
    const cursorId = decodeIdCursor(cursor);
    const [rows, total] = await Promise.all([
      this.prisma.track.findMany({
        where: { artistId },
        orderBy: { id: 'asc' },
        take: limit + 1,
        ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
        include: {
          artist: true,
          album: {
            select: {
              deezerId: true,
              title: true,
              coverUrl: true,
              releaseDate: true,
            },
          },
        },
      }),
      this.prisma.track.count({ where: { artistId } }),
    ]);

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore
      ? encodeIdCursor(items[items.length - 1].id)
      : null;
    return { items, nextCursor, total };
  }

  async topReviewedAlbumIds(
    artistId: string,
    take: number,
  ): Promise<CatalogReviewGroup[]> {
    const groups = await this.prisma.review.groupBy({
      by: ['albumId'],
      where: {
        type: 'ALBUM',
        status: 'ACTIVE',
        deletedAt: null,
        albumId: { not: null },
        album: { artistId },
      },
      _count: { albumId: true },
      _avg: { rating: true },
      orderBy: [{ _count: { albumId: 'desc' } }, { _avg: { rating: 'desc' } }],
      take,
    });
    return groups.map((g) => ({
      id: g.albumId!,
      reviewCount: g._count.albumId,
      avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
    }));
  }

  async topReviewedTrackIds(
    artistId: string,
    take: number,
  ): Promise<CatalogReviewGroup[]> {
    const groups = await this.prisma.review.groupBy({
      by: ['trackId'],
      where: {
        type: 'TRACK',
        status: 'ACTIVE',
        deletedAt: null,
        trackId: { not: null },
        track: { artistId },
      },
      _count: { trackId: true },
      _avg: { rating: true },
      orderBy: [{ _count: { trackId: 'desc' } }, { _avg: { rating: 'desc' } }],
      take,
    });
    return groups.map((g) => ({
      id: g.trackId!,
      reviewCount: g._count.trackId,
      avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
    }));
  }

  async trendingAlbumIds(
    artistId: string,
    take: number,
    windowStart: Date,
  ): Promise<CatalogReviewGroup[]> {
    const groups = await this.prisma.review.groupBy({
      by: ['albumId'],
      where: {
        type: 'ALBUM',
        status: 'ACTIVE',
        deletedAt: null,
        albumId: { not: null },
        album: { artistId },
        createdAt: { gte: windowStart },
      },
      _count: { albumId: true },
      _avg: { rating: true },
      orderBy: [{ _count: { albumId: 'desc' } }, { _avg: { rating: 'desc' } }],
      take,
    });
    return groups.map((g) => ({
      id: g.albumId!,
      reviewCount: g._count.albumId,
      avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
    }));
  }

  async trendingTrackIds(
    artistId: string,
    take: number,
    windowStart: Date,
  ): Promise<CatalogReviewGroup[]> {
    const groups = await this.prisma.review.groupBy({
      by: ['trackId'],
      where: {
        type: 'TRACK',
        status: 'ACTIVE',
        deletedAt: null,
        trackId: { not: null },
        track: { artistId },
        createdAt: { gte: windowStart },
      },
      _count: { trackId: true },
      _avg: { rating: true },
      orderBy: [{ _count: { trackId: 'desc' } }, { _avg: { rating: 'desc' } }],
      take,
    });
    return groups.map((g) => ({
      id: g.trackId!,
      reviewCount: g._count.trackId,
      avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
    }));
  }

  hydrateAlbumSummaries(ids: string[]) {
    if (ids.length === 0) return Promise.resolve([]);
    return this.prisma.album.findMany({
      where: { id: { in: ids } },
      include: { artist: true },
    });
  }

  hydrateTrackSummaries(ids: string[]) {
    if (ids.length === 0) return Promise.resolve([]);
    return this.prisma.track.findMany({
      where: { id: { in: ids } },
      include: {
        artist: true,
        album: { select: { deezerId: true, coverUrl: true } },
      },
    });
  }

  // albumId solo se escribe en `update` cuando viene con un valor real —
  // getTrack() puede llamar a esto con albumId=null (todavía no se sabe el
  // álbum local) y eso NUNCA debe pisar un link ya resuelto por una llamada
  // anterior a getAlbum(). Pero cuando sí llega un albumId (getAlbum(), o
  // getTrack() habiendo resuelto el álbum por su deezerId), este upsert debe
  // "sanar" el link aunque el Track ya existiera con albumId=null — antes no
  // lo hacía, dejando tracks huérfanos para siempre (docs/fase-5-features.md,
  // coverUrl null en trending).
  upsertTrack(data: CatalogTrack, artistId: string, albumId: string | null) {
    const now = new Date();
    return this.prisma.track.upsert({
      where: { deezerId: data.deezerId },
      update: {
        title: data.title,
        durationMs: data.durationMs,
        trackNumber: data.trackNumber,
        previewUrl: data.previewUrl,
        lastSyncedAt: now,
        ...(albumId && { albumId }),
      },
      create: {
        deezerId: data.deezerId,
        title: data.title,
        artistId,
        albumId,
        durationMs: data.durationMs,
        trackNumber: data.trackNumber,
        previewUrl: data.previewUrl,
        lastSyncedAt: now,
      },
    });
  }
}
