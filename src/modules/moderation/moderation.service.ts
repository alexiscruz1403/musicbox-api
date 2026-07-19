import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from '../../email/email.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import type { CreateReportDto } from './dto/create-report.dto.js';
import type { ListReportsQueryDto } from './dto/list-reports-query.dto.js';
import type { UpdateReportStatusDto } from './dto/update-report-status.dto.js';
import {
  MAX_PENALTY_LEVEL,
  PENALTY_REPORTS_PER_LEVEL,
} from './moderation.constants.js';
import { ModerationRepository } from './moderation.repository.js';

@Injectable()
export class ModerationService {
  constructor(
    private readonly repo: ModerationRepository,
    private readonly notifications: NotificationsService,
    private readonly email: EmailService,
  ) {}

  async createReport(reporterId: string, dto: CreateReportDto) {
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

  async listReports(query: ListReportsQueryDto) {
    return this.repo.listReports(
      query.status,
      query.targetType,
      query.cursor,
      query.limit,
    );
  }

  async updateReportStatus(
    adminId: string,
    reportId: string,
    dto: UpdateReportStatusDto,
  ) {
    const report = await this.repo.findReportById(reportId);
    if (!report) {
      throw new NotFoundException({
        code: 'REPORT_NOT_FOUND',
      });
    }

    const updated = await this.repo.updateReportStatus(
      reportId,
      dto.status,
      adminId,
    );

    if (dto.status === 'REVIEWED') {
      await this.acceptReport(report.targetType, report.targetId);
    }

    return updated;
  }

  async hideContent(type: string, id: string) {
    if (type === 'review') {
      const review = await this.repo.findActiveReview(id);
      if (!review) {
        throw new NotFoundException({
          code: 'REVIEW_NOT_FOUND',
        });
      }
      return this.repo.hideReviewIfActive(
        id,
        review.type,
        review.trackId,
        review.albumId,
      );
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

  async suspendUser(id: string) {
    const user = await this.repo.findActiveUser(id);
    if (!user) {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
      });
    }
    await this.repo.suspendUser(id);
  }

  // Acciones al aceptar un reporte (docs/musicbox.md §15): ocultar contenido
  // + notificar al dueño (sólo REVIEW/COMMENT) + evaluar penalización del
  // usuario ofensor (siempre).
  private async acceptReport(
    targetType: 'REVIEW' | 'COMMENT' | 'USER',
    targetId: string,
  ): Promise<void> {
    let offenderId: string | undefined;

    if (targetType === 'REVIEW') {
      const review = await this.repo.findReviewOwner(targetId);
      if (review) {
        offenderId = review.userId;
        await this.repo.hideReviewIfActive(
          targetId,
          review.type,
          review.trackId,
          review.albumId,
        );
        await this.notifications.notifyModeration(offenderId, {
          reviewId: targetId,
        });
      }
    } else if (targetType === 'COMMENT') {
      const comment = await this.repo.findCommentOwner(targetId);
      if (comment) {
        offenderId = comment.userId;
        await this.repo.hideCommentIfActive(targetId);
        await this.notifications.notifyModeration(offenderId, {
          commentId: targetId,
        });
      }
    } else {
      offenderId = targetId;
    }

    if (offenderId) {
      await this.applyPenaltyForOffender(offenderId);
    }
  }

  private async applyPenaltyForOffender(offenderId: string): Promise<void> {
    const count = await this.repo.incrementAcceptedReports(offenderId);
    if (count % PENALTY_REPORTS_PER_LEVEL !== 0) return;

    const level = count / PENALTY_REPORTS_PER_LEVEL;
    if (level > MAX_PENALTY_LEVEL) {
      const [offender] = await this.repo.suspendUser(offenderId);
      await this.email.sendAccountSuspendedEmail(
        offender.email,
        offender.language,
      );
      return;
    }

    await this.repo.applyTemporaryPenalty(offenderId, level);
  }
}
