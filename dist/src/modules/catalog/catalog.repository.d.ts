import { PrismaService } from '../../prisma/prisma.service.js';
import type { CatalogAlbum, CatalogArtist, CatalogTrack } from './providers/music-catalog.provider.js';
export declare class CatalogRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertArtist(data: CatalogArtist): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        name: string;
        id: string;
        deezerId: string;
        mbid: string | null;
        imageUrl: string | null;
        lastSyncedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    upsertAlbum(data: CatalogAlbum, artistId: string): import("../../../generated/prisma/models.js").Prisma__AlbumClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    upsertTrack(data: CatalogTrack, artistId: string, albumId: string | null): import("../../../generated/prisma/models.js").Prisma__TrackClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        title: string;
        artistId: string;
        albumId: string | null;
        durationMs: number | null;
        trackNumber: number | null;
        previewUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
