import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
declare const REVIEW_USER_INCLUDE: {
    readonly user: {
        readonly select: {
            readonly id: true;
            readonly handle: true;
            readonly displayName: true;
            readonly avatarUrl: true;
        };
    };
};
export type FeedReviewRow = Prisma.ReviewGetPayload<{
    include: typeof REVIEW_USER_INCLUDE;
}>;
interface AllModeFetchParams {
    excludeUserIds: string[];
    albumIds: string[];
    trackIds: string[];
    artistIds: string[];
    cursorId?: string;
    take: number;
}
interface TrendingOrRandomParams extends AllModeFetchParams {
    trendingIds: string[];
}
export declare class FeedRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listFeed(userId: string, cursor: string | undefined, limit: number): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
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
        })[];
        nextCursor: string | null;
    }>;
    private paginate;
    getFollowedIds(userId: string): Promise<string[]>;
    getOwnReviewSignals(userId: string): Prisma.PrismaPromise<{
        album: {
            artistId: string;
        } | null;
        track: {
            artistId: string;
        } | null;
        trackId: string | null;
        albumId: string | null;
    }[]>;
    getTodaysCandidateIds(excludeUserIds: string[], since: Date): Promise<string[]>;
    countLikesByReviewIds(reviewIds: string[]): Promise<never[]> | Prisma.GetReviewReactionGroupByPayload<{
        by: "reviewId"[];
        where: {
            reviewId: {
                in: string[];
            };
            type: "LIKE";
        };
        _count: true;
    }>;
    countCommentsByReviewIds(reviewIds: string[]): Promise<never[]> | Prisma.GetCommentGroupByPayload<{
        by: "reviewId"[];
        where: {
            reviewId: {
                in: string[];
            };
            status: "ACTIVE";
            deletedAt: null;
        };
        _count: true;
    }>;
    findSimilarReviews(params: AllModeFetchParams): Promise<FeedReviewRow[]>;
    findTrendingReviews(params: TrendingOrRandomParams): Promise<FeedReviewRow[]>;
    findRandomReviews(params: TrendingOrRandomParams): Promise<FeedReviewRow[]>;
    private buildSignalOr;
}
export {};
