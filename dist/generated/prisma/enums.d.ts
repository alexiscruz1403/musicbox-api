export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DELETED: "DELETED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
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
