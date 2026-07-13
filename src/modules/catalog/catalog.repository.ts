import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  decodeCatalogCursor,
  encodeCatalogCursor,
} from './catalog-cursor.util.js';
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

@Injectable()
export class CatalogRepository {
  constructor(private readonly prisma: PrismaService) {}

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
    const cursorId = decodeCatalogCursor(cursor);
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
      ? encodeCatalogCursor(items[items.length - 1].id)
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
