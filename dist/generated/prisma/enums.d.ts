export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DELETED: "DELETED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const UserRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ReviewType: {
    readonly TRACK: "TRACK";
    readonly ALBUM: "ALBUM";
};
export type ReviewType = (typeof ReviewType)[keyof typeof ReviewType];
export declare const ContentStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly HIDDEN: "HIDDEN";
    readonly DELETED: "DELETED";
};
export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];
export declare const ReactionType: {
    readonly LIKE: "LIKE";
    readonly DISLIKE: "DISLIKE";
};
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];
export declare const NotificationType: {
    readonly LIKE: "LIKE";
    readonly DISLIKE: "DISLIKE";
    readonly COMMENT: "COMMENT";
    readonly FOLLOW: "FOLLOW";
    readonly MODERATION: "MODERATION";
    readonly FOLLOW_REQUEST: "FOLLOW_REQUEST";
    readonly FOLLOW_REQUEST_ACCEPTED: "FOLLOW_REQUEST_ACCEPTED";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const ReportTargetType: {
    readonly REVIEW: "REVIEW";
    readonly COMMENT: "COMMENT";
    readonly USER: "USER";
};
export type ReportTargetType = (typeof ReportTargetType)[keyof typeof ReportTargetType];
export declare const ReportStatus: {
    readonly PENDING: "PENDING";
    readonly REVIEWED: "REVIEWED";
    readonly DISMISSED: "DISMISSED";
};
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
export declare const FollowRequestStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
};
export type FollowRequestStatus = (typeof FollowRequestStatus)[keyof typeof FollowRequestStatus];
