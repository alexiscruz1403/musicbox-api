import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CatalogAlbum,
  CatalogArtist,
  CatalogTrack,
} from './providers/music-catalog.provider.js';

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
