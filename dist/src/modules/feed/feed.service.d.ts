import { SocialService } from '../social/social.service.js';
import type { ListFeedQueryDto } from './dto/list-feed-query.dto.js';
import { FeedRepository } from './feed.repository.js';
export declare class FeedService {
    private readonly repo;
    private readonly social;
    constructor(repo: FeedRepository, social: SocialService);
    getFeed(userId: string, query: ListFeedQueryDto): Promise<{
        items: {
            likesCount: number;
            dislikesCount: number;
            commentsCount: number;
            userReaction: "LIKE" | "DISLIKE" | null;
            user: {
                handle: string;
                displayName: string;
                id: string;
                avatarUrl: string | null;
            };
            type: import("../../../generated/prisma/enums.js").ReviewType;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            trackId: string | null;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    private getAllFeed;
    private deriveSignalIds;
    private getTrendingIds;
}
