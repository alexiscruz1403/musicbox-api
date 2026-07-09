import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ModerationService } from './moderation.service.js';
export declare class ReportsController {
    private readonly moderation;
    constructor(moderation: ModerationService);
    create(user: JwtPayload, dto: CreateReportDto): Promise<{
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
}
