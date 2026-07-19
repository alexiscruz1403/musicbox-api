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
    }>;
    private autoAcceptPendingFollowRequests;
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
    quickSearchUsers(q: string, viewerId?: string): Promise<{
        isFollowing: boolean;
        handle: string;
        displayName: string;
        avatarUrl: string | null;
        isPrivate: boolean;
    }[]>;
    getFollowers(handle: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
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
    }>;
    getFollowing(handle: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
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
    }>;
    follow(followerId: string, handle: string): Promise<{
        status: 'FOLLOWING';
    } | {
        status: 'PENDING';
        followRequestId: string;
    }>;
    unfollow(followerId: string, handle: string): Promise<void>;
    listFollowRequests(userId: string, cursor?: string, limit?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            requester: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        }[];
        nextCursor: string | null;
    }>;
    respondToFollowRequest(userId: string, requestId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    }>;
}
