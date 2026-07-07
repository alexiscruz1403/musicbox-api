export const MUSIC_CATALOG_PROVIDER = 'MUSIC_CATALOG_PROVIDER';

export type CatalogSearchType = 'album' | 'track' | 'artist';

export interface CatalogArtist {
  deezerId: string;
  name: string;
  imageUrl: string | null;
  fans: number;
}

export interface CatalogTrack {
  deezerId: string;
  title: string;
  artist: CatalogArtist;
  albumDeezerId: string | null;
  coverUrl: string | null;
  releaseDate: string | null;
  durationMs: number | null;
  trackNumber: number | null;
  previewUrl: string | null;
}

export interface CatalogAlbum {
  deezerId: string;
  title: string;
  artist: CatalogArtist;
  coverUrl: string | null;
  releaseDate: string | null;
  genreLabel: string | null;
  tracks: CatalogTrack[];
  fans: number;
}

export type CatalogSearchResult =
  | { type: 'artist'; item: CatalogArtist }
  | { type: 'album'; item: CatalogAlbum }
  | { type: 'track'; item: CatalogTrack };

export interface CatalogPage<T> {
  items: T[];
  nextCursor: string | null;
  total: number;
}

export interface MusicCatalogProvider {
  search(
    query: string,
    type: CatalogSearchType,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<CatalogSearchResult>>;

  getAlbum(deezerId: string): Promise<CatalogAlbum>;
  getTrack(deezerId: string): Promise<CatalogTrack>;
  getArtist(deezerId: string): Promise<CatalogArtist>;

  getArtistAlbums(
    deezerId: string,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<CatalogAlbum>>;
}
