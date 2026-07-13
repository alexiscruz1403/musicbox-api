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
                id: string;
                handle: string;
                displayName: string;
                email: string;
                avatarUrl: string | null;
                coverUrl: string | null;
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
                    trackId: string;
                    description: string | null;
                    rating: number;
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
            id: string;
            handle: string;
            displayName: string;
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
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
                coverUrl: string | null;
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
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            }[];
            nextCursor: string | null;
        };
    }>;
    getFollowing(handle: string, cursor?: string, limit?: string): Promise<{
        data: {
            items: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            }[];
            nextCursor: string | null;
        };
    }>;
    getReviews(handle: string, query: ListUserReviewsQueryDto): Promise<{
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
