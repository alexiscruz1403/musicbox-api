export interface DeezerArtist {
    id: number;
    name: string;
    picture_medium: string;
    nb_fan?: number;
    nb_album?: number;
}
export interface DeezerTrack {
    id: number;
    title: string;
    artist: DeezerArtist;
    release_date?: string;
    album?: {
        id: number;
        title?: string;
        cover_medium: string;
        release_date?: string;
    };
    duration: number;
    track_position: number;
    preview: string;
}
export interface DeezerAlbum {
    id: number;
    title: string;
    artist: DeezerArtist;
    cover_medium: string;
    release_date: string;
    genres?: {
        data: Array<{
            name: string;
        }>;
    };
    tracks?: {
        data: DeezerTrack[];
    };
    fans?: number;
}
export interface DeezerSearchResponse<T> {
    data: T[];
    total: number;
    next?: string;
}
export interface DeezerError {
    error: {
        code: number;
        message: string;
        type: string;
    };
}
