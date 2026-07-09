import { ConfigService } from '@nestjs/config';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersRepository } from './users.repository.js';
export declare class UsersService {
    private readonly repo;
    private readonly config;
    private readonly events;
    constructor(repo: UsersRepository, config: ConfigService, events: SocialEventsProducer);
    getMe(userId: string): Promise<{
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
            emailVerifiedAt: Date | null;
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
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
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
        emailVerifiedAt: Date | null;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    }>;
    uploadAvatar(userId: string, buffer: Buffer): Promise<string>;
    deleteAccount(userId: string): Promise<void>;
    exportAccountData(userId: string): Promise<{
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
            emailVerifiedAt: Date | null;
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
    }>;
    getNotifPrefs(userId: string): Promise<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
    }>;
    updateNotifPrefs(userId: string, dto: UpdateNotifPrefsDto): Promise<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
    }>;
    checkHandle(handle: string, currentUserId?: string): Promise<{
        available: boolean;
    }>;
    getPublicProfile(handle: string, viewerId?: string): Promise<{
        user: {
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
            bio: string | null;
            notifEnabled: boolean;
            status: import("../../../generated/prisma/enums.js").UserStatus;
            role: import("../../../generated/prisma/enums.js").UserRole;
            emailVerifiedAt: Date | null;
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
    }>;
    searchUsers(q: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: {
            isFollowing: boolean;
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    getFollowers(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    getFollowing(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    follow(followerId: string, handle: string): Promise<void>;
    unfollow(followerId: string, handle: string): Promise<void>;
}
