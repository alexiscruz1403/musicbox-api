import { Injectable } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import type { CatalogSearchResult } from './providers/music-catalog.provider.js';

const PER_TYPE_LIMIT = 5;
const RESULT_LIMIT = 5;

export type QuickSearchCatalogItem =
  | {
      type: 'artist';
      deezerId: string;
      coverUrl: string | null;
      title: string;
      artist: null;
      albumsCount: number;
    }
  | {
      type: 'album' | 'track';
      deezerId: string;
      coverUrl: string | null;
      title: string;
      artist: string;
    };

function toQuickSearchItem(
  result: CatalogSearchResult,
): QuickSearchCatalogItem {
  if (result.type === 'artist') {
    return {
      type: 'artist',
      deezerId: result.item.deezerId,
      coverUrl: result.item.imageUrl,
      title: result.item.name,
      artist: null,
      albumsCount: result.item.albumsCount,
    };
  }
  return {
    type: result.type,
    deezerId: result.item.deezerId,
    coverUrl: result.item.coverUrl,
    title: result.item.title,
    artist: result.item.artist.name,
  };
}

@Injectable()
export class CatalogQuickSearchService {
  constructor(private readonly catalog: CatalogService) {}

  // Mixes all 3 catalog types in one autocomplete-style response, capped at
  // 5 total — reuses CatalogService.search()'s existing Redis cache per
  // type, no new caching needed.
  async quickSearch(query: string): Promise<QuickSearchCatalogItem[]> {
    const [artists, albums, tracks] = await Promise.all([
      this.catalog.search(query, 'artist', PER_TYPE_LIMIT, null),
      this.catalog.search(query, 'album', PER_TYPE_LIMIT, null),
      this.catalog.search(query, 'track', PER_TYPE_LIMIT, null),
    ]);

    const lists = [artists.items, albums.items, tracks.items];
    const interleaved: CatalogSearchResult[] = [];
    for (let i = 0; i < PER_TYPE_LIMIT; i++) {
      for (const list of lists) {
        if (list[i]) interleaved.push(list[i]);
      }
    }

    return interleaved.slice(0, RESULT_LIMIT).map(toQuickSearchItem);
  }
}
