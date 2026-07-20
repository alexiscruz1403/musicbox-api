import { EmailService } from '../../email/email.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import type { CreateReportDto } from './dto/create-report.dto.js';
import type { ListReportsQueryDto } from './dto/list-reports-query.dto.js';
import type { UpdateReportStatusDto } from './dto/update-report-status.dto.js';
import { ModerationRepository } from './moderation.repository.js';
export declare class ModerationService {
    private readonly repo;
    private readonly notifications;
    private readonly email;
    constructor(repo: ModerationRepository, notifications: NotificationsService, email: EmailService);
    createReport(reporterId: string, dto: CreateReportDto): Promise<{
        createdAt: Date;
        id: string;
        status: import("../../../generated/prisma/enums.js").ReportStatus;
        targetId: string;
        targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
        reason: string;
        reviewedAt: Date | null;
        reporterId: string;
        reviewedById: string | null;
    }>;
    listReports(query: ListReportsQueryDto): Promise<{
        items: ({
            reporter: {
                id: string;
                handle: string;
                displayName: string;
            };
        } & {
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ReportStatus;
            targetId: string;
            targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
            reason: string;
            reviewedAt: Date | null;
            reporterId: string;
            reviewedById: string | null;
        } & {
            reportedContent: import("./moderation.repository.js").ReportedContent;
        })[];
        nextCursor: string | null;
    }>;
    updateReportStatus(adminId: string, reportId: string, dto: UpdateReportStatusDto): Promise<{
        createdAt: Date;
        id: string;
        status: import("../../../generated/prisma/enums.js").ReportStatus;
        targetId: string;
        targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
        reason: string;
        reviewedAt: Date | null;
        reporterId: string;
        reviewedById: string | null;
    }>;
    hideContent(type: string, id: string): Promise<void>;
    suspendUser(id: string): Promise<void>;
    private acceptReport;
    private applyPenaltyForOffender;
}
