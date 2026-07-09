import { PrismaService } from '../../prisma/prisma.service.js';
type ReportTargetType = 'REVIEW' | 'COMMENT' | 'USER';
type ReportStatus = 'PENDING' | 'REVIEWED' | 'DISMISSED';
export interface ReportedReviewContent {
    reviewType: 'TRACK' | 'ALBUM';
    description: string;
    trackDescriptions?: {
        trackTitle: string;
        description: string | null;
    }[];
}
export type ReportedContent = ReportedReviewContent | {
    content: string;
} | {
    handle: string;
} | null;
export declare class ModerationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createReport(data: {
        reporterId: string;
        targetType: ReportTargetType;
        targetId: string;
        reason: string;
    }): import("../../../generated/prisma/models.js").Prisma__ReportClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ReportStatus;
        createdAt: Date;
        targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
        targetId: string;
        reason: string;
        reviewedAt: Date | null;
        reporterId: string;
        reviewedById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    targetExists(targetType: ReportTargetType, targetId: string): Promise<boolean>;
    findReportById(id: string): import("../../../generated/prisma/models.js").Prisma__ReportClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ReportStatus;
        createdAt: Date;
        targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
        targetId: string;
        reason: string;
        reviewedAt: Date | null;
        reporterId: string;
        reviewedById: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    listReports(status: ReportStatus | undefined, targetType: ReportTargetType | undefined, cursor: string | undefined, limit: number): Promise<{
        items: ({
            reporter: {
                handle: string;
                displayName: string;
                id: string;
            };
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").ReportStatus;
            createdAt: Date;
            targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
            targetId: string;
            reason: string;
            reviewedAt: Date | null;
            reporterId: string;
            reviewedById: string | null;
        } & {
            reportedContent: ReportedContent;
        })[];
        nextCursor: string | null;
    }>;
    private hydrateReportedContent;
    private buildReportedContent;
    updateReportStatus(id: string, status: 'REVIEWED' | 'DISMISSED', reviewedById: string): import("../../../generated/prisma/models.js").Prisma__ReportClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ReportStatus;
        createdAt: Date;
        targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
        targetId: string;
        reason: string;
        reviewedAt: Date | null;
        reporterId: string;
        reviewedById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findReviewOwner(id: string): import("../../../generated/prisma/models.js").Prisma__ReviewClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findCommentOwner(id: string): import("../../../generated/prisma/models.js").Prisma__CommentClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    hideReviewIfActive(id: string): Promise<void>;
    hideCommentIfActive(id: string): Promise<void>;
    findActiveReview(id: string): import("../../../generated/prisma/models.js").Prisma__ReviewClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findActiveComment(id: string): import("../../../generated/prisma/models.js").Prisma__CommentClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        content: string;
        reviewId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findActiveUser(id: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    incrementAcceptedReports(userId: string): Promise<number>;
    applyTemporaryPenalty(userId: string, level: number): import("../../../generated/prisma/models.js").Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    suspendUser(id: string): Promise<[{
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
    }, import("../../../generated/prisma/internal/prismaNamespace.js").BatchPayload]>;
    private decodeCursor;
    private paginate;
}
export {};
