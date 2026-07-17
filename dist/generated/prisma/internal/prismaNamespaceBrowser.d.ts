import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Follow: "Follow";
    readonly FollowRequest: "FollowRequest";
    readonly RefreshToken: "RefreshToken";
    readonly Artist: "Artist";
    readonly Album: "Album";
    readonly Track: "Track";
    readonly Review: "Review";
    readonly TrackReviewItem: "TrackReviewItem";
    readonly ReviewReaction: "ReviewReaction";
    readonly Comment: "Comment";
    readonly Notification: "Notification";
    readonly NotificationPreference: "NotificationPreference";
    readonly PushSubscription: "PushSubscription";
    readonly Report: "Report";
    readonly RecommendationSnapshot: "RecommendationSnapshot";
    readonly FollowSuggestionSnapshot: "FollowSuggestionSnapshot";
    readonly TrendingSnapshot: "TrendingSnapshot";
    readonly CatalogSearchHistory: "CatalogSearchHistory";
    readonly UserSearchHistory: "UserSearchHistory";
    readonly RecentlyViewedItem: "RecentlyViewedItem";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly handle: "handle";
    readonly displayName: "displayName";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly googleId: "googleId";
    readonly avatarUrl: "avatarUrl";
    readonly avatarPublicId: "avatarPublicId";
    readonly coverUrl: "coverUrl";
    readonly coverPublicId: "coverPublicId";
    readonly bio: "bio";
    readonly notifEnabled: "notifEnabled";
    readonly isPrivate: "isPrivate";
    readonly status: "status";
    readonly role: "role";
    readonly consentedAt: "consentedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly acceptedReportsCount: "acceptedReportsCount";
    readonly penaltyLevel: "penaltyLevel";
    readonly penalizedUntil: "penalizedUntil";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const FollowScalarFieldEnum: {
    readonly followerId: "followerId";
    readonly followeeId: "followeeId";
    readonly createdAt: "createdAt";
};
export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum];
export declare const FollowRequestScalarFieldEnum: {
    readonly id: "id";
    readonly requesterId: "requesterId";
    readonly targetId: "targetId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly respondedAt: "respondedAt";
};
export type FollowRequestScalarFieldEnum = (typeof FollowRequestScalarFieldEnum)[keyof typeof FollowRequestScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly userAgent: "userAgent";
    readonly ip: "ip";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const ArtistScalarFieldEnum: {
    readonly id: "id";
    readonly deezerId: "deezerId";
    readonly mbid: "mbid";
    readonly name: "name";
    readonly imageUrl: "imageUrl";
    readonly lastSyncedAt: "lastSyncedAt";
    readonly catalogSyncedAt: "catalogSyncedAt";
};
export type ArtistScalarFieldEnum = (typeof ArtistScalarFieldEnum)[keyof typeof ArtistScalarFieldEnum];
export declare const AlbumScalarFieldEnum: {
    readonly id: "id";
    readonly deezerId: "deezerId";
    readonly mbid: "mbid";
    readonly title: "title";
    readonly artistId: "artistId";
    readonly coverUrl: "coverUrl";
    readonly releaseDate: "releaseDate";
    readonly genreLabel: "genreLabel";
    readonly lastSyncedAt: "lastSyncedAt";
};
export type AlbumScalarFieldEnum = (typeof AlbumScalarFieldEnum)[keyof typeof AlbumScalarFieldEnum];
export declare const TrackScalarFieldEnum: {
    readonly id: "id";
    readonly deezerId: "deezerId";
    readonly mbid: "mbid";
    readonly title: "title";
    readonly albumId: "albumId";
    readonly artistId: "artistId";
    readonly durationMs: "durationMs";
    readonly trackNumber: "trackNumber";
    readonly previewUrl: "previewUrl";
    readonly lastSyncedAt: "lastSyncedAt";
};
export type TrackScalarFieldEnum = (typeof TrackScalarFieldEnum)[keyof typeof TrackScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly trackId: "trackId";
    readonly albumId: "albumId";
    readonly description: "description";
    readonly rating: "rating";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly externalTitle: "externalTitle";
    readonly externalArtistName: "externalArtistName";
    readonly externalCoverUrl: "externalCoverUrl";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const TrackReviewItemScalarFieldEnum: {
    readonly id: "id";
    readonly reviewId: "reviewId";
    readonly trackId: "trackId";
    readonly rating: "rating";
    readonly description: "description";
    readonly position: "position";
};
export type TrackReviewItemScalarFieldEnum = (typeof TrackReviewItemScalarFieldEnum)[keyof typeof TrackReviewItemScalarFieldEnum];
export declare const ReviewReactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly reviewId: "reviewId";
    readonly type: "type";
    readonly createdAt: "createdAt";
};
export type ReviewReactionScalarFieldEnum = (typeof ReviewReactionScalarFieldEnum)[keyof typeof ReviewReactionScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly reviewId: "reviewId";
    readonly content: "content";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly recipientId: "recipientId";
    readonly actorId: "actorId";
    readonly type: "type";
    readonly reviewId: "reviewId";
    readonly commentId: "commentId";
    readonly actorCount: "actorCount";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const NotificationPreferenceScalarFieldEnum: {
    readonly userId: "userId";
    readonly likesEnabled: "likesEnabled";
    readonly dislikesEnabled: "dislikesEnabled";
    readonly commentsEnabled: "commentsEnabled";
    readonly followsEnabled: "followsEnabled";
    readonly followRequestsEnabled: "followRequestsEnabled";
};
export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum];
export declare const PushSubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly endpoint: "endpoint";
    readonly p256dh: "p256dh";
    readonly auth: "auth";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
    readonly lastSeenAt: "lastSeenAt";
};
export type PushSubscriptionScalarFieldEnum = (typeof PushSubscriptionScalarFieldEnum)[keyof typeof PushSubscriptionScalarFieldEnum];
export declare const ReportScalarFieldEnum: {
    readonly id: "id";
    readonly reporterId: "reporterId";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly reason: "reason";
    readonly status: "status";
    readonly reviewedById: "reviewedById";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum];
export declare const RecommendationSnapshotScalarFieldEnum: {
    readonly userId: "userId";
    readonly payload: "payload";
    readonly generatedAt: "generatedAt";
};
export type RecommendationSnapshotScalarFieldEnum = (typeof RecommendationSnapshotScalarFieldEnum)[keyof typeof RecommendationSnapshotScalarFieldEnum];
export declare const FollowSuggestionSnapshotScalarFieldEnum: {
    readonly userId: "userId";
    readonly payload: "payload";
    readonly generatedAt: "generatedAt";
};
export type FollowSuggestionSnapshotScalarFieldEnum = (typeof FollowSuggestionSnapshotScalarFieldEnum)[keyof typeof FollowSuggestionSnapshotScalarFieldEnum];
export declare const TrendingSnapshotScalarFieldEnum: {
    readonly id: "id";
    readonly payload: "payload";
    readonly snapshotAt: "snapshotAt";
};
export type TrendingSnapshotScalarFieldEnum = (typeof TrendingSnapshotScalarFieldEnum)[keyof typeof TrendingSnapshotScalarFieldEnum];
export declare const CatalogSearchHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly query: "query";
    readonly searchedAt: "searchedAt";
};
export type CatalogSearchHistoryScalarFieldEnum = (typeof CatalogSearchHistoryScalarFieldEnum)[keyof typeof CatalogSearchHistoryScalarFieldEnum];
export declare const UserSearchHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly searcherId: "searcherId";
    readonly query: "query";
    readonly searchedAt: "searchedAt";
};
export type UserSearchHistoryScalarFieldEnum = (typeof UserSearchHistoryScalarFieldEnum)[keyof typeof UserSearchHistoryScalarFieldEnum];
export declare const RecentlyViewedItemScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly resourceType: "resourceType";
    readonly deezerId: "deezerId";
    readonly title: "title";
    readonly artistName: "artistName";
    readonly coverUrl: "coverUrl";
    readonly albumsCount: "albumsCount";
    readonly viewedAt: "viewedAt";
};
export type RecentlyViewedItemScalarFieldEnum = (typeof RecentlyViewedItemScalarFieldEnum)[keyof typeof RecentlyViewedItemScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
