import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { CatalogService } from '../catalog/catalog.service.js';
import type { CatalogAlbum } from '../catalog/providers/music-catalog.provider.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import {
  MAX_FAVORITE_ARTISTS,
  MAX_PER_ARTIST,
  MIN_REVIEWS_FOR_RECOMMENDATIONS,
  RECOMMENDATIONS_TOP_N,
  SIMILAR_ARTISTS_PER_FAVORITE,
  type RecommendationItem,
  type RecommendationReason,
} from './recommendations.constants.js';
import { RecommendationsRepository } from './recommendations.repository.js';

interface FavoriteArtist {
  artistId: string;
  name: string;
  count: number;
}

interface RankedCandidate extends RecommendationItem {
  fans: number;
}

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly repo: RecommendationsRepository,
    private readonly catalog: CatalogService,
    private readonly lastfm: LastFmClient,
  ) {}

  async getRecommendations(userId: string): Promise<{
    recommendations: RecommendationItem[];
    generatedAt: Date;
  } | null> {
    const reviewCount = await this.repo.countActiveReviews(userId);
    if (reviewCount < MIN_REVIEWS_FOR_RECOMMENDATIONS) return null;

    let snapshot = await this.repo.getSnapshot(userId);
    if (!snapshot) snapshot = await this.recompute(userId);

    // Re-filter on read (same pattern as FollowSuggestionsService): drop
    // albums the user reviewed since the snapshot was generated, without
    // forcing a recompute.
    const reviewedIds = await this.getReviewedDeezerIds(userId);
    const recommendations = (
      snapshot.payload as unknown as RecommendationItem[]
    ).filter((r) => !reviewedIds.has(r.deezerId));

    return { recommendations, generatedAt: snapshot.generatedAt };
  }

  async recompute(userId: string) {
    const reviewCount = await this.repo.countActiveReviews(userId);
    if (reviewCount < MIN_REVIEWS_FOR_RECOMMENDATIONS) {
      // Guard: dropped below the threshold since the job was queued (e.g.
      // reviews deleted) — keep any existing snapshot rather than blank it.
      const existing = await this.repo.getSnapshot(userId);
      if (existing) return existing;
      return this.repo.upsertSnapshot(userId, [], new Date());
    }

    const [favoriteArtists, genres, reviewedDeezerIds] = await Promise.all([
      this.getFavoriteArtists(userId),
      this.getGenres(userId),
      this.getReviewedDeezerIds(userId),
    ]);

    const seen = new Set<string>(reviewedDeezerIds);
    const perArtist = new Map<string, number>();
    const candidates: RankedCandidate[] = [];

    const tryAdd = (
      album: CatalogAlbum,
      reason: RecommendationReason,
      reasonLabel: string,
    ) => {
      if (seen.has(album.deezerId)) return;
      const count = perArtist.get(album.artist.deezerId) ?? 0;
      if (count >= MAX_PER_ARTIST) return;
      seen.add(album.deezerId);
      perArtist.set(album.artist.deezerId, count + 1);
      candidates.push({
        deezerId: album.deezerId,
        type: 'album',
        title: album.title,
        artistName: album.artist.name,
        coverUrl: album.coverUrl,
        reason,
        reasonLabel,
        fans: album.fans,
      });
    };

    for (const fav of favoriteArtists) {
      try {
        const similar = await this.lastfm.getSimilarArtists(
          fav.name,
          SIMILAR_ARTISTS_PER_FAVORITE,
        );
        for (const s of similar) {
          try {
            const found = await this.catalog.search(s.name, 'artist', 1, null);
            const match = found.items[0];
            if (!match || match.type !== 'artist') continue;
            const albums = await this.catalog.getArtistAlbums(
              match.item.deezerId,
              SIMILAR_ARTISTS_PER_FAVORITE,
              null,
            );
            for (const album of albums.items) {
              tryAdd(album, 'SIMILAR_ARTIST', `Porque reseñaste a ${fav.name}`);
            }
          } catch {
            // One similar artist failing to resolve on Deezer shouldn't
            // break the rest of the favorite artist's candidates.
          }
        }
      } catch {
        // A single favorite artist's Last.fm lookup failing shouldn't abort
        // the whole recompute.
      }
    }

    if (candidates.length < RECOMMENDATIONS_TOP_N && genres.length > 0) {
      const remaining = RECOMMENDATIONS_TOP_N - candidates.length;
      const localAlbums = await this.repo.findAlbumsByGenres(
        genres,
        [...seen],
        remaining,
      );
      for (const row of localAlbums) {
        try {
          const album = await this.catalog.getAlbum(row.deezerId);
          tryAdd(
            album,
            'GENRE_MATCH',
            `Porque te gusta el género ${row.genreLabel}`,
          );
        } catch {
          // Locally cached album no longer reachable on Deezer — skip.
        }
      }
    }

    const ranked: RecommendationItem[] = candidates
      .sort((a, b) => {
        if (a.reason !== b.reason) {
          return a.reason === 'SIMILAR_ARTIST' ? -1 : 1;
        }
        return b.fans - a.fans;
      })
      .slice(0, RECOMMENDATIONS_TOP_N)
      .map(({ fans: _fans, ...item }) => item);

    const generatedAt = new Date();
    return this.repo.upsertSnapshot(
      userId,
      ranked as unknown as Prisma.InputJsonValue,
      generatedAt,
    );
  }

  private async getFavoriteArtists(userId: string): Promise<FavoriteArtist[]> {
    const rows = await this.repo.getFavoriteArtistSignals(userId);
    const counts = new Map<string, { name: string; count: number }>();
    for (const r of rows) {
      const artistId = r.album?.artistId ?? r.track?.artistId;
      const artist = r.album?.artist ?? r.track?.artist;
      if (!artistId || !artist) continue;
      const entry = counts.get(artistId) ?? { name: artist.name, count: 0 };
      entry.count += 1;
      counts.set(artistId, entry);
    }
    // Any artist with at least one review rated >= MIN_FAVORITE_ARTIST_RATING
    // qualifies as a seed — a single well-rated review is already enough for
    // Last.fm to surface up to MAX_PER_ARTIST albums from each of up to
    // SIMILAR_ARTISTS_PER_FAVORITE similar artists, so requiring 2+ reviews
    // per artist (previous behavior) starved users whose reviews spread
    // across distinct artists of any SIMILAR_ARTIST candidates at all.
    return [...counts.entries()]
      .map(([artistId, v]) => ({ artistId, name: v.name, count: v.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, MAX_FAVORITE_ARTISTS);
  }

  private async getGenres(userId: string): Promise<string[]> {
    const rows = await this.repo.getGenreSignals(userId);
    const genres = new Set<string>();
    for (const r of rows) {
      const genre = r.album?.genreLabel ?? r.track?.album?.genreLabel;
      if (genre) genres.add(genre);
    }
    return [...genres];
  }

  private async getReviewedDeezerIds(userId: string): Promise<Set<string>> {
    const rows = await this.repo.getReviewedAlbumDeezerIds(userId);
    const ids = new Set<string>();
    for (const r of rows) {
      const deezerId = r.album?.deezerId ?? r.track?.album?.deezerId;
      if (deezerId) ids.add(deezerId);
    }
    return ids;
  }
}
