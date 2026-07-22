import { CloudinaryService } from '../../cloudinary/cloudinary.service.js';
import { FollowService } from './follow.service.js';
import { UserSearchRepository } from './user-search.repository.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersRepository } from './users.repository.js';
export declare class UsersService {
    private readonly repo;
    private readonly userSearchRepo;
    private readonly followService;
    private readonly cloudinaryService;
    constructor(repo: UsersRepository, userSearchRepo: UserSearchRepository, followService: FollowService, cloudinaryService: CloudinaryService);
    getMe(userId: string): Promise<{
        user: {
            status: import("../../../generated/prisma/enums.js").UserStatus;
            id: string;
            createdAt: Date;
            handle: string;
            displayName: string;
            email: string;
            avatarUrl: string | null;
            coverUrl: string | null;
            bio: string | null;
            notifEnabled: boolean;
            isPrivate: boolean;
            role: import("../../../generated/prisma/enums.js").UserRole;
            language: import("../../../generated/prisma/enums.js").Language;
            consentedAt: Date | null;
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
        status: import("../../../generated/prisma/enums.js").UserStatus;
        id: string;
        createdAt: Date;
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
        role: import("../../../generated/prisma/enums.js").UserRole;
        language: import("../../../generated/prisma/enums.js").Language;
        consentedAt: Date | null;
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
            status: import("../../../generated/prisma/enums.js").UserStatus;
            id: string;
            createdAt: Date;
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
            role: import("../../../generated/prisma/enums.js").UserRole;
            language: import("../../../generated/prisma/enums.js").Language;
            consentedAt: Date | null;
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
                rating: import("@prisma/client-runtime-utils").Decimal;
                position: number;
            }[];
        } & {
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
        })[];
        comments: {
            userId: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            id: string;
            reviewId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            content: string;
        }[];
        reactions: {
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReactionType;
            id: string;
            reviewId: string;
            createdAt: Date;
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
    }>;
    getNotifPrefs(userId: string): Promise<(Omit<{
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
    })>;
    updateNotifPrefs(userId: string, dto: UpdateNotifPrefsDto): Promise<(Omit<{
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
    })>;
    private getUserOrThrow;
    private applyNotifPrefsVisibility;
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
            status: "ACTIVE" | "SUSPENDED";
            isPrivate: boolean;
            createdAt: Date;
        };
        stats: {
            reviewCount: number;
            followersCount: number;
            followingCount: number;
        };
        isFollowing: boolean;
        followRequestPending: boolean;
    }>;
    searchUsers(q: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: ({
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        } & {
            isFollowing: boolean;
        })[];
        nextCursor: string | null;
    }>;
    quickSearchUsers(q: string, viewerId?: string): Promise<{
        handle: string;
        displayName: string;
        avatarUrl: string | null;
        isPrivate: boolean;
        isFollowing: boolean;
    }[]>;
}
