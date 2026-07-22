import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListFeedQueryDto } from './dto/list-feed-query.dto.js';
import { FeedService } from './feed.service.js';
export declare class FeedController {
    private readonly feed;
    constructor(feed: FeedService);
    getFeed(user: JwtPayload, query: ListFeedQueryDto): Promise<{
        data: {
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
            userId: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            trackId: string | null;
            albumId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        }[];
        meta: {
            cursor: string | null;
        };
    }>;
}
