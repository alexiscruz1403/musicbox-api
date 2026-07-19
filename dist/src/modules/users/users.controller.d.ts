import type { Request, Response } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListUserReviewsQueryDto } from '../reviews/dto/list-user-reviews-query.dto.js';
import { ReviewsService } from '../reviews/reviews.service.js';
import { QuickSearchUsersDto } from './dto/quick-search-users.dto.js';
import { SearchUsersQueryDto } from './dto/search-users-query.dto.js';
import { UpdateFollowRequestStatusDto } from './dto/update-follow-request-status.dto.js';
import { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UserSearchHistoryService } from './user-search-history.service.js';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly users;
    private readonly reviews;
    private readonly searchHistory;
    constructor(users: UsersService, reviews: ReviewsService, searchHistory: UserSearchHistoryService);
    getMe(user: JwtPayload): Promise<{
        data: {
            user: {
                id: string;
                handle: string;
                displayName: string;
                email: string;
                avatarUrl: string | null;
                coverUrl: string | null;
                bio: string | null;
                notifEnabled: boolean;
                isPrivate: boolean;
                status: import("../../../generated/prisma/enums.js").UserStatus;
                role: import("../../../generated/prisma/enums.js").UserRole;
                language: import("../../../generated/prisma/enums.js").Language;
                consentedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                acceptedReportsCount: number;
                penaltyLevel: number;
                penalizedUntil: Date | null;
            };
            stats: {
                reviewCount: number;
                followersCount: number;
                followingCount: number;
            };
        };
    }>;
    updateMe(user: JwtPayload, dto: UpdateProfileDto): Promise<{
        data: {
            id: string;
            handle: string;
            displayName: string;
            email: string;
            passwordHash: string | null;
            googleId: string | null;
            avatarUrl: string | null;
            avatarPublicId: string | null;
            coverUrl: string | null;
            coverPublicId: string | null;
            bio: string | null;
            notifEnabled: boolean;
            isPrivate: boolean;
            status: import("../../../generated/prisma/enums.js").UserStatus;
            role: import("../../../generated/prisma/enums.js").UserRole;
            language: import("../../../generated/prisma/enums.js").Language;
            consentedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            acceptedReportsCount: number;
            penaltyLevel: number;
            penalizedUntil: Date | null;
        };
    }>;
    uploadAvatar(user: JwtPayload, file: Express.Multer.File): Promise<{
        data: {
            avatarUrl: string;
        };
    }>;
    uploadCover(user: JwtPayload, file: Express.Multer.File): Promise<{
        data: {
            coverUrl: string;
        };
    }>;
    deleteMe(user: JwtPayload): Promise<void>;
    exportMe(user: JwtPayload): Promise<{
        data: {
            profile: {
                id: string;
                handle: string;
                displayName: string;
                email: string;
                avatarUrl: string | null;
                avatarPublicId: string | null;
                coverUrl: string | null;
                coverPublicId: string | null;
                bio: string | null;
                notifEnabled: boolean;
                isPrivate: boolean;
                status: import("../../../generated/prisma/enums.js").UserStatus;
                role: import("../../../generated/prisma/enums.js").UserRole;
                language: import("../../../generated/prisma/enums.js").Language;
                consentedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                acceptedReportsCount: number;
                penaltyLevel: number;
                penalizedUntil: Date | null;
            };
            reviews: ({
                trackReviewItems: {
                    id: string;
                    trackId: string;
                    description: string | null;
                    rating: import("@prisma/client-runtime-utils").Decimal;
                    reviewId: string;
                    position: number;
                }[];
            } & {
                id: string;
                status: import("../../../generated/prisma/enums.js").ContentStatus;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                userId: string;
                albumId: string | null;
                type: import("../../../generated/prisma/enums.js").ReviewType;
                trackId: string | null;
                description: string | null;
                rating: import("@prisma/client-runtime-utils").Decimal;
                externalTitle: string;
                externalArtistName: string;
                externalCoverUrl: string | null;
            })[];
            comments: {
                id: string;
                status: import("../../../generated/prisma/enums.js").ContentStatus;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                userId: string;
                reviewId: string;
                content: string;
            }[];
            reactions: {
                id: string;
                createdAt: Date;
                userId: string;
                type: import("../../../generated/prisma/enums.js").ReactionType;
                reviewId: string;
            }[];
            follows: {
                followers: {
                    id: string;
                    handle: string;
                    displayName: string;
                }[];
                following: {
                    id: string;
                    handle: string;
                    displayName: string;
                }[];
            };
            notificationPreferences: {
                userId: string;
                likesEnabled: boolean;
                dislikesEnabled: boolean;
                commentsEnabled: boolean;
                followsEnabled: boolean;
                followRequestsEnabled: boolean;
            } | null;
            exportedAt: string;
        };
    }>;
    getNotifPrefs(user: JwtPayload): Promise<{
        data: (Omit<{
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
            followRequestsEnabled: boolean;
        }, "followsEnabled" | "followRequestsEnabled"> & {
            followRequestsEnabled: boolean;
        }) | (Omit<{
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
            followRequestsEnabled: boolean;
        }, "followsEnabled" | "followRequestsEnabled"> & {
            followsEnabled: boolean;
        });
    }>;
    updateNotifPrefs(user: JwtPayload, dto: UpdateNotifPrefsDto): Promise<{
        data: (Omit<{
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
            followRequestsEnabled: boolean;
        }, "followsEnabled" | "followRequestsEnabled"> & {
            followRequestsEnabled: boolean;
        }) | (Omit<{
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
            followRequestsEnabled: boolean;
        }, "followsEnabled" | "followRequestsEnabled"> & {
            followsEnabled: boolean;
        });
    }>;
    listFollowRequests(user: JwtPayload, cursor?: string, limit?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            requester: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        }[];
        meta: {
            cursor: string | null;
        };
    }>;
    respondFollowRequest(user: JwtPayload, id: string, dto: UpdateFollowRequestStatusDto): Promise<{
        data: {
            id: string;
            status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
            createdAt: Date;
            requesterId: string;
            targetId: string;
            respondedAt: Date | null;
        };
    }>;
    searchUsers(query: SearchUsersQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            isFollowing: boolean;
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        meta: {
            cursor: string | null;
        };
    }>;
    quickSearchUsers(query: QuickSearchUsersDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            isFollowing: boolean;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
            isPrivate: boolean;
        }[];
    }>;
    listSearchHistory(user: JwtPayload): Promise<{
        data: {
            id: string;
            query: string;
            searchedAt: Date;
            searcherId: string;
        }[];
    }>;
    deleteSearchHistoryItem(user: JwtPayload, id: string): Promise<void>;
    deleteAllSearchHistory(user: JwtPayload): Promise<void>;
    checkHandle(handle: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            available: boolean;
        };
    }>;
    getPublicProfile(handle: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
                coverUrl: string | null;
                bio: string | null;
                notifEnabled: boolean;
                isPrivate: boolean;
                status: import("../../../generated/prisma/enums.js").UserStatus;
                role: import("../../../generated/prisma/enums.js").UserRole;
                language: import("../../../generated/prisma/enums.js").Language;
                consentedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                acceptedReportsCount: number;
                penaltyLevel: number;
                penalizedUntil: Date | null;
            };
            stats: {
                reviewCount: number;
                followersCount: number;
                followingCount: number;
            };
            isFollowing: boolean;
            followRequestPending: boolean;
        };
    }>;
    getFollowers(handle: string, req: Request & {
        user?: JwtPayload;
    }, cursor?: string, limit?: string): Promise<{
        data: {
            items: ({
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
                isPrivate: boolean;
            } & {
                isFollowing: boolean;
            })[];
            nextCursor: string | null;
        };
    }>;
    getFollowing(handle: string, req: Request & {
        user?: JwtPayload;
    }, cursor?: string, limit?: string): Promise<{
        data: {
            items: ({
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
                isPrivate: boolean;
            } & {
                isFollowing: boolean;
            })[];
            nextCursor: string | null;
        };
    }>;
    getReviews(handle: string, query: ListUserReviewsQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            avatarUrl: string | null;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
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
    follow(user: JwtPayload, handle: string, res: Response): Promise<{
        data: {
            status: "PENDING";
            followRequestId: string;
        };
    } | undefined>;
    unfollow(user: JwtPayload, handle: string): Promise<void>;
}
