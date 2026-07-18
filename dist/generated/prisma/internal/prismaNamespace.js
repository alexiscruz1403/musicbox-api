import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Follow: 'Follow',
    FollowRequest: 'FollowRequest',
    RefreshToken: 'RefreshToken',
    Artist: 'Artist',
    Album: 'Album',
    Track: 'Track',
    Review: 'Review',
    TrackReviewItem: 'TrackReviewItem',
    ReviewReaction: 'ReviewReaction',
    Comment: 'Comment',
    Notification: 'Notification',
    NotificationPreference: 'NotificationPreference',
    PushSubscription: 'PushSubscription',
    Report: 'Report',
    RecommendationSnapshot: 'RecommendationSnapshot',
    FollowSuggestionSnapshot: 'FollowSuggestionSnapshot',
    TrendingSnapshot: 'TrendingSnapshot',
    CatalogSearchHistory: 'CatalogSearchHistory',
    UserSearchHistory: 'UserSearchHistory',
    RecentlyViewedItem: 'RecentlyViewedItem'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    handle: 'handle',
    displayName: 'displayName',
    email: 'email',
    passwordHash: 'passwordHash',
    googleId: 'googleId',
    avatarUrl: 'avatarUrl',
    avatarPublicId: 'avatarPublicId',
    coverUrl: 'coverUrl',
    coverPublicId: 'coverPublicId',
    bio: 'bio',
    notifEnabled: 'notifEnabled',
    isPrivate: 'isPrivate',
    status: 'status',
    role: 'role',
    consentedAt: 'consentedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    acceptedReportsCount: 'acceptedReportsCount',
    penaltyLevel: 'penaltyLevel',
    penalizedUntil: 'penalizedUntil'
};
export const FollowScalarFieldEnum = {
    followerId: 'followerId',
    followeeId: 'followeeId',
    createdAt: 'createdAt'
};
export const FollowRequestScalarFieldEnum = {
    id: 'id',
    requesterId: 'requesterId',
    targetId: 'targetId',
    status: 'status',
    createdAt: 'createdAt',
    respondedAt: 'respondedAt'
};
export const RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    userAgent: 'userAgent',
    ip: 'ip',
    createdAt: 'createdAt'
};
export const ArtistScalarFieldEnum = {
    id: 'id',
    deezerId: 'deezerId',
    mbid: 'mbid',
    name: 'name',
    imageUrl: 'imageUrl',
    lastSyncedAt: 'lastSyncedAt',
    catalogSyncedAt: 'catalogSyncedAt',
    reviewCount: 'reviewCount'
};
export const AlbumScalarFieldEnum = {
    id: 'id',
    deezerId: 'deezerId',
    mbid: 'mbid',
    title: 'title',
    artistId: 'artistId',
    coverUrl: 'coverUrl',
    releaseDate: 'releaseDate',
    genreLabel: 'genreLabel',
    lastSyncedAt: 'lastSyncedAt',
    reviewCount: 'reviewCount'
};
export const TrackScalarFieldEnum = {
    id: 'id',
    deezerId: 'deezerId',
    mbid: 'mbid',
    title: 'title',
    albumId: 'albumId',
    artistId: 'artistId',
    durationMs: 'durationMs',
    trackNumber: 'trackNumber',
    previewUrl: 'previewUrl',
    lastSyncedAt: 'lastSyncedAt',
    reviewCount: 'reviewCount'
};
export const ReviewScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    trackId: 'trackId',
    albumId: 'albumId',
    description: 'description',
    rating: 'rating',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    externalTitle: 'externalTitle',
    externalArtistName: 'externalArtistName',
    externalCoverUrl: 'externalCoverUrl'
};
export const TrackReviewItemScalarFieldEnum = {
    id: 'id',
    reviewId: 'reviewId',
    trackId: 'trackId',
    rating: 'rating',
    description: 'description',
    position: 'position'
};
export const ReviewReactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    reviewId: 'reviewId',
    type: 'type',
    createdAt: 'createdAt'
};
export const CommentScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    reviewId: 'reviewId',
    content: 'content',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    recipientId: 'recipientId',
    actorId: 'actorId',
    type: 'type',
    reviewId: 'reviewId',
    commentId: 'commentId',
    actorCount: 'actorCount',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
export const NotificationPreferenceScalarFieldEnum = {
    userId: 'userId',
    likesEnabled: 'likesEnabled',
    dislikesEnabled: 'dislikesEnabled',
    commentsEnabled: 'commentsEnabled',
    followsEnabled: 'followsEnabled',
    followRequestsEnabled: 'followRequestsEnabled'
};
export const PushSubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    endpoint: 'endpoint',
    p256dh: 'p256dh',
    auth: 'auth',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    lastSeenAt: 'lastSeenAt'
};
export const ReportScalarFieldEnum = {
    id: 'id',
    reporterId: 'reporterId',
    targetType: 'targetType',
    targetId: 'targetId',
    reason: 'reason',
    status: 'status',
    reviewedById: 'reviewedById',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const RecommendationSnapshotScalarFieldEnum = {
    userId: 'userId',
    payload: 'payload',
    generatedAt: 'generatedAt'
};
export const FollowSuggestionSnapshotScalarFieldEnum = {
    userId: 'userId',
    payload: 'payload',
    generatedAt: 'generatedAt'
};
export const TrendingSnapshotScalarFieldEnum = {
    id: 'id',
    payload: 'payload',
    snapshotAt: 'snapshotAt'
};
export const CatalogSearchHistoryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    query: 'query',
    searchedAt: 'searchedAt'
};
export const UserSearchHistoryScalarFieldEnum = {
    id: 'id',
    searcherId: 'searcherId',
    query: 'query',
    searchedAt: 'searchedAt'
};
export const RecentlyViewedItemScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    resourceType: 'resourceType',
    deezerId: 'deezerId',
    title: 'title',
    artistName: 'artistName',
    coverUrl: 'coverUrl',
    albumsCount: 'albumsCount',
    viewedAt: 'viewedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map