import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListReportsQueryDto } from './dto/list-reports-query.dto.js';
import { UpdateReportStatusDto } from './dto/update-report-status.dto.js';
import { ModerationService } from './moderation.service.js';
export declare class AdminModerationController {
    private readonly moderation;
    constructor(moderation: ModerationService);
    list(query: ListReportsQueryDto): Promise<{
        data: ({
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
            reportedContent: import("./moderation.repository.js").ReportedContent;
        })[];
        meta: {
            cursor: string | null;
        };
    }>;
    updateStatus(admin: JwtPayload, id: string, dto: UpdateReportStatusDto): Promise<{
        data: {
            id: string;
            status: import("../../../generated/prisma/enums.js").ReportStatus;
            createdAt: Date;
            targetType: import("../../../generated/prisma/enums.js").ReportTargetType;
            targetId: string;
            reason: string;
            reviewedAt: Date | null;
            reporterId: string;
            reviewedById: string | null;
        };
    }>;
    hideContent(type: string, id: string): Promise<void>;
    suspendUser(id: string): Promise<void>;
}
