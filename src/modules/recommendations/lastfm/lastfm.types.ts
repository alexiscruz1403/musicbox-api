export interface LastFmSimilarArtist {
  name: string;
}

export interface LastFmSimilarArtistsResponse {
  similarartists?: {
    artist?: Array<{ name: string }>;
  };
  error?: number;
  message?: string;
}
