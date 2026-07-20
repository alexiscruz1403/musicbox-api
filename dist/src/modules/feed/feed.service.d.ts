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
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            albumId: string | null;
            description: string | null;
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
