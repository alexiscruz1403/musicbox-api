import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
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
    Report: 'Report',
    RecommendationSnapshot: 'RecommendationSnapshot'
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
    bio: 'bio',
    notifEnabled: 'notifEnabled',
    status: 'status',
    emailVerifiedAt: 'emailVerifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const FollowScalarFieldEnum = {
    followerId: 'followerId',
    followeeId: 'followeeId',
    createdAt: 'createdAt'
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
    lastSyncedAt: 'lastSyncedAt'
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
    lastSyncedAt: 'lastSyncedAt'
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
    lastSyncedAt: 'lastSyncedAt'
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
    readAt: 'readAt',
    createdAt: 'createdAt'
};
export const NotificationPreferenceScalarFieldEnum = {
    userId: 'userId',
    likesEnabled: 'likesEnabled',
    dislikesEnabled: 'dislikesEnabled',
    commentsEnabled: 'commentsEnabled',
    followsEnabled: 'followsEnabled'
};
export const ReportScalarFieldEnum = {
    id: 'id',
    reporterId: 'reporterId',
    targetType: 'targetType',
    targetId: 'targetId',
    reason: 'reason',
    status: 'status',
    createdAt: 'createdAt'
};
export const RecommendationSnapshotScalarFieldEnum = {
    userId: 'userId',
    payload: 'payload',
    generatedAt: 'generatedAt'
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
//# sourceMappingURL=prismaNamespaceBrowser.js.map