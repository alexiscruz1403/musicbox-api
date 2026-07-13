import { CloudinaryService } from '../../cloudinary/cloudinary.service.js';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersRepository } from './users.repository.js';
export declare class UsersService {
    private readonly repo;
    private readonly events;
    private readonly cloudinaryService;
    constructor(repo: UsersRepository, events: SocialEventsProducer, cloudinaryService: CloudinaryService);
    getMe(userId: string): Promise<{
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
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
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
    }>;
    uploadAvatar(userId: string, buffer: Buffer): Promise<string>;
    uploadCover(userId: string, buffer: Buffer): Promise<string>;
    deleteAccount(userId: string): Promise<void>;
    exportAccountData(userId: string): Promise<{
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
    }>;
    searchUsers(q: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: {
            isFollowing: boolean;
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    getFollowers(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    getFollowing(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    follow(followerId: string, handle: string): Promise<void>;
    unfollow(followerId: string, handle: string): Promise<void>;
}
