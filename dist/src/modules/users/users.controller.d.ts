import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListUserReviewsQueryDto } from '../reviews/dto/list-user-reviews-query.dto.js';
import { ReviewsService } from '../reviews/reviews.service.js';
import { SearchUsersQueryDto } from './dto/search-users-query.dto.js';
import { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly users;
    private readonly reviews;
    constructor(users: UsersService, reviews: ReviewsService);
    getMe(user: JwtPayload): Promise<{
        data: {
            user: {
                handle: string;
                displayName: string;
                email: string;
                id: string;
                passwordHash: string | null;
                googleId: string | null;
                avatarUrl: string | null;
                bio: string | null;
                notifEnabled: boolean;
                status: import("../../../generated/prisma/enums.js").UserStatus;
                role: import("../../../generated/prisma/enums.js").UserRole;
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
            handle: string;
            displayName: string;
            email: string;
            id: string;
            passwordHash: string | null;
            googleId: string | null;
            avatarUrl: string | null;
            bio: string | null;
            notifEnabled: boolean;
            status: import("../../../generated/prisma/enums.js").UserStatus;
            role: import("../../../generated/prisma/enums.js").UserRole;
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
    deleteMe(user: JwtPayload): Promise<void>;
    exportMe(user: JwtPayload): Promise<{
        data: {
            profile: {
                handle: string;
                displayName: string;
                email: string;
                id: string;
                avatarUrl: string | null;
                bio: string | null;
                notifEnabled: boolean;
                status: import("../../../generated/prisma/enums.js").UserStatus;
                role: import("../../../generated/prisma/enums.js").UserRole;
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
                    reviewId: string;
                    trackId: string;
                    description: string | null;
                    rating: number;
                    position: number;
                }[];
            } & {
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
            })[];
            comments: {
                id: string;
                status: import("../../../generated/prisma/enums.js").ContentStatus;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                userId: string;
                content: string;
                reviewId: string;
            }[];
            reactions: {
                type: import("../../../generated/prisma/enums.js").ReactionType;
                id: string;
                createdAt: Date;
                userId: string;
                reviewId: string;
            }[];
            follows: {
                followers: {
                    handle: string;
                    displayName: string;
                    id: string;
                }[];
                following: {
                    handle: string;
                    displayName: string;
                    id: string;
                }[];
            };
            notificationPreferences: {
                userId: string;
                likesEnabled: boolean;
                dislikesEnabled: boolean;
                commentsEnabled: boolean;
                followsEnabled: boolean;
            } | null;
            exportedAt: string;
        };
    }>;
    getNotifPrefs(user: JwtPayload): Promise<{
        data: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
        };
    }>;
    updateNotifPrefs(user: JwtPayload, dto: UpdateNotifPrefsDto): Promise<{
        data: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
        };
    }>;
    searchUsers(query: SearchUsersQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            isFollowing: boolean;
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        meta: {
            cursor: string | null;
        };
    }>;
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
                handle: string;
                displayName: string;
                id: string;
                avatarUrl: string | null;
                bio: string | null;
                notifEnabled: boolean;
                status: import("../../../generated/prisma/enums.js").UserStatus;
                role: import("../../../generated/prisma/enums.js").UserRole;
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
        };
    }>;
    getFollowers(handle: string, cursor?: string, limit?: string): Promise<{
        data: {
            items: {
                handle: string;
                displayName: string;
                id: string;
                avatarUrl: string | null;
            }[];
            nextCursor: string | null;
        };
    }>;
    getFollowing(handle: string, cursor?: string, limit?: string): Promise<{
        data: {
            items: {
                handle: string;
                displayName: string;
                id: string;
                avatarUrl: string | null;
            }[];
            nextCursor: string | null;
        };
    }>;
    getReviews(handle: string, query: ListUserReviewsQueryDto): Promise<{
        data: {
            avatarUrl: string | null;
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
        meta: {
            cursor: string | null;
        };
    }>;
    follow(user: JwtPayload, handle: string): Promise<void>;
    unfollow(user: JwtPayload, handle: string): Promise<void>;
}
