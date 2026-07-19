var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { EmailService } from '../../email/email.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { MAX_PENALTY_LEVEL, PENALTY_REPORTS_PER_LEVEL, } from './moderation.constants.js';
import { ModerationRepository } from './moderation.repository.js';
let ModerationService = class ModerationService {
    repo;
    notifications;
    email;
    constructor(repo, notifications, email) {
        this.repo = repo;
        this.notifications = notifications;
        this.email = email;
    }
    async createReport(reporterId, dto) {
        const exists = await this.repo.targetExists(dto.targetType, dto.targetId);
        if (!exists) {
            throw new NotFoundException({
                code: 'REPORT_TARGET_NOT_FOUND',
            });
        }
        return this.repo.createReport({
            reporterId,
            targetType: dto.targetType,
            targetId: dto.targetId,
            reason: dto.reason,
        });
    }
    async listReports(query) {
        return this.repo.listReports(query.status, query.targetType, query.cursor, query.limit);
    }
    async updateReportStatus(adminId, reportId, dto) {
        const report = await this.repo.findReportById(reportId);
        if (!report) {
            throw new NotFoundException({
                code: 'REPORT_NOT_FOUND',
            });
        }
        const updated = await this.repo.updateReportStatus(reportId, dto.status, adminId);
        if (dto.status === 'REVIEWED') {
            await this.acceptReport(report.targetType, report.targetId);
        }
        return updated;
    }
    async hideContent(type, id) {
        if (type === 'review') {
            const review = await this.repo.findActiveReview(id);
            if (!review) {
                throw new NotFoundException({
                    code: 'REVIEW_NOT_FOUND',
                });
            }
            return this.repo.hideReviewIfActive(id, review.type, review.trackId, review.albumId);
        }
        if (type === 'comment') {
            const comment = await this.repo.findActiveComment(id);
            if (!comment) {
                throw new NotFoundException({
                    code: 'COMMENT_NOT_FOUND',
                });
            }
            return this.repo.hideCommentIfActive(id);
        }
        throw new BadRequestException({
            code: 'INVALID_CONTENT_TYPE',
        });
    }
    async suspendUser(id) {
        const user = await this.repo.findActiveUser(id);
        if (!user) {
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        }
        await this.repo.suspendUser(id);
    }
    async acceptReport(targetType, targetId) {
        let offenderId;
        if (targetType === 'REVIEW') {
            const review = await this.repo.findReviewOwner(targetId);
            if (review) {
                offenderId = review.userId;
                await this.repo.hideReviewIfActive(targetId, review.type, review.trackId, review.albumId);
                await this.notifications.notifyModeration(offenderId, {
                    reviewId: targetId,
                });
            }
        }
        else if (targetType === 'COMMENT') {
            const comment = await this.repo.findCommentOwner(targetId);
            if (comment) {
                offenderId = comment.userId;
                await this.repo.hideCommentIfActive(targetId);
                await this.notifications.notifyModeration(offenderId, {
                    commentId: targetId,
                });
            }
        }
        else {
            offenderId = targetId;
        }
        if (offenderId) {
            await this.applyPenaltyForOffender(offenderId);
        }
    }
    async applyPenaltyForOffender(offenderId) {
        const count = await this.repo.incrementAcceptedReports(offenderId);
        if (count % PENALTY_REPORTS_PER_LEVEL !== 0)
            return;
        const level = count / PENALTY_REPORTS_PER_LEVEL;
        if (level > MAX_PENALTY_LEVEL) {
            const [offender] = await this.repo.suspendUser(offenderId);
            await this.email.sendAccountSuspendedEmail(offender.email, offender.language);
            return;
        }
        await this.repo.applyTemporaryPenalty(offenderId, level);
    }
};
ModerationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ModerationRepository,
        NotificationsService,
        EmailService])
], ModerationService);
export { ModerationService };
//# sourceMappingURL=moderation.service.js.map