import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../../email/email.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { ModerationRepository } from './moderation.repository.js';
import { ModerationService } from './moderation.service.js';

const mockRepo = {
  createReport: vi.fn(),
  targetExists: vi.fn(),
  findReportById: vi.fn(),
  listReports: vi.fn(),
  updateReportStatus: vi.fn(),
  findReviewOwner: vi.fn(),
  findCommentOwner: vi.fn(),
  hideReviewIfActive: vi.fn(),
  hideCommentIfActive: vi.fn(),
  findActiveReview: vi.fn(),
  findActiveComment: vi.fn(),
  findActiveUser: vi.fn(),
  incrementAcceptedReports: vi.fn(),
  applyTemporaryPenalty: vi.fn(),
  suspendUser: vi.fn(),
};

const mockNotifications = {
  notifyModeration: vi.fn(),
};

const mockEmail = {
  sendAccountSuspendedEmail: vi.fn(),
};

describe('ModerationService', () => {
  let service: ModerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModerationService,
        { provide: ModerationRepository, useValue: mockRepo },
        { provide: NotificationsService, useValue: mockNotifications },
        { provide: EmailService, useValue: mockEmail },
      ],
    }).compile();

    service = module.get(ModerationService);
    vi.clearAllMocks();
  });

  describe('createReport', () => {
    it('throws NotFoundException when target does not exist', async () => {
      mockRepo.targetExists.mockResolvedValue(false);
      await expect(
        service.createReport('reporter1', {
          targetType: 'REVIEW',
          targetId: 'r1',
          reason: 'spam',
        }),
      ).rejects.toThrow(NotFoundException);
      expect(mockRepo.createReport).not.toHaveBeenCalled();
    });

    it('creates the report when target exists', async () => {
      mockRepo.targetExists.mockResolvedValue(true);
      mockRepo.createReport.mockResolvedValue({ id: 'report1' });

      await service.createReport('reporter1', {
        targetType: 'REVIEW',
        targetId: 'r1',
        reason: 'spam',
      });

      expect(mockRepo.createReport).toHaveBeenCalledWith({
        reporterId: 'reporter1',
        targetType: 'REVIEW',
        targetId: 'r1',
        reason: 'spam',
      });
    });
  });

  describe('listReports', () => {
    it('forwards status, targetType, cursor and limit to the repository', async () => {
      mockRepo.listReports.mockResolvedValue({ items: [], nextCursor: null });

      await service.listReports({
        status: 'PENDING',
        targetType: 'COMMENT',
        cursor: 'cursor-1',
        limit: 10,
      });

      expect(mockRepo.listReports).toHaveBeenCalledWith(
        'PENDING',
        'COMMENT',
        'cursor-1',
        10,
      );
    });

    it('forwards undefined status/targetType when omitted (no filter = "todos")', async () => {
      mockRepo.listReports.mockResolvedValue({ items: [], nextCursor: null });

      await service.listReports({ limit: 20 });

      expect(mockRepo.listReports).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined,
        20,
      );
    });
  });

  describe('updateReportStatus', () => {
    it('throws NotFoundException if report does not exist', async () => {
      mockRepo.findReportById.mockResolvedValue(null);
      await expect(
        service.updateReportStatus('admin1', 'report1', {
          status: 'DISMISSED',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('DISMISSED only updates the report, no side effects', async () => {
      mockRepo.findReportById.mockResolvedValue({
        id: 'report1',
        targetType: 'REVIEW',
        targetId: 'r1',
      });
      mockRepo.updateReportStatus.mockResolvedValue({ id: 'report1' });

      await service.updateReportStatus('admin1', 'report1', {
        status: 'DISMISSED',
      });

      expect(mockRepo.updateReportStatus).toHaveBeenCalledWith(
        'report1',
        'DISMISSED',
        'admin1',
      );
      expect(mockRepo.hideReviewIfActive).not.toHaveBeenCalled();
      expect(mockRepo.incrementAcceptedReports).not.toHaveBeenCalled();
    });

    it('REVIEWED on a REVIEW hides it, notifies the owner, and penalizes', async () => {
      mockRepo.findReportById.mockResolvedValue({
        id: 'report1',
        targetType: 'REVIEW',
        targetId: 'review1',
      });
      mockRepo.updateReportStatus.mockResolvedValue({ id: 'report1' });
      mockRepo.findReviewOwner.mockResolvedValue({
        id: 'review1',
        userId: 'owner1',
        status: 'ACTIVE',
      });
      mockRepo.incrementAcceptedReports.mockResolvedValue(1);

      await service.updateReportStatus('admin1', 'report1', {
        status: 'REVIEWED',
      });

      expect(mockRepo.hideReviewIfActive).toHaveBeenCalledWith('review1');
      expect(mockNotifications.notifyModeration).toHaveBeenCalledWith(
        'owner1',
        { reviewId: 'review1' },
      );
      expect(mockRepo.incrementAcceptedReports).toHaveBeenCalledWith('owner1');
    });

    it('REVIEWED on a COMMENT hides it, notifies the owner, and penalizes', async () => {
      mockRepo.findReportById.mockResolvedValue({
        id: 'report1',
        targetType: 'COMMENT',
        targetId: 'comment1',
      });
      mockRepo.updateReportStatus.mockResolvedValue({ id: 'report1' });
      mockRepo.findCommentOwner.mockResolvedValue({
        id: 'comment1',
        userId: 'owner1',
        status: 'ACTIVE',
      });
      mockRepo.incrementAcceptedReports.mockResolvedValue(1);

      await service.updateReportStatus('admin1', 'report1', {
        status: 'REVIEWED',
      });

      expect(mockRepo.hideCommentIfActive).toHaveBeenCalledWith('comment1');
      expect(mockNotifications.notifyModeration).toHaveBeenCalledWith(
        'owner1',
        { commentId: 'comment1' },
      );
      expect(mockRepo.incrementAcceptedReports).toHaveBeenCalledWith('owner1');
    });

    it('REVIEWED on a USER only penalizes, no hide/notify', async () => {
      mockRepo.findReportById.mockResolvedValue({
        id: 'report1',
        targetType: 'USER',
        targetId: 'user1',
      });
      mockRepo.updateReportStatus.mockResolvedValue({ id: 'report1' });
      mockRepo.incrementAcceptedReports.mockResolvedValue(1);

      await service.updateReportStatus('admin1', 'report1', {
        status: 'REVIEWED',
      });

      expect(mockRepo.hideReviewIfActive).not.toHaveBeenCalled();
      expect(mockRepo.hideCommentIfActive).not.toHaveBeenCalled();
      expect(mockNotifications.notifyModeration).not.toHaveBeenCalled();
      expect(mockRepo.incrementAcceptedReports).toHaveBeenCalledWith('user1');
    });
  });

  describe('penalty escalation (via updateReportStatus REVIEWED on USER)', () => {
    const acceptUserReport = () =>
      service.updateReportStatus('admin1', 'report1', { status: 'REVIEWED' });

    beforeEach(() => {
      mockRepo.findReportById.mockResolvedValue({
        id: 'report1',
        targetType: 'USER',
        targetId: 'user1',
      });
      mockRepo.updateReportStatus.mockResolvedValue({ id: 'report1' });
    });

    it('does nothing when the count is not a multiple of 3', async () => {
      mockRepo.incrementAcceptedReports.mockResolvedValue(2);
      await acceptUserReport();
      expect(mockRepo.applyTemporaryPenalty).not.toHaveBeenCalled();
      expect(mockRepo.suspendUser).not.toHaveBeenCalled();
    });

    it('applies a 1-day penalty at the 3rd accepted report (level 1)', async () => {
      mockRepo.incrementAcceptedReports.mockResolvedValue(3);
      await acceptUserReport();
      expect(mockRepo.applyTemporaryPenalty).toHaveBeenCalledWith('user1', 1);
    });

    it('applies a 7-day penalty at the 21st accepted report (level 7)', async () => {
      mockRepo.incrementAcceptedReports.mockResolvedValue(21);
      await acceptUserReport();
      expect(mockRepo.applyTemporaryPenalty).toHaveBeenCalledWith('user1', 7);
      expect(mockRepo.suspendUser).not.toHaveBeenCalled();
    });

    it('suspends the account and emails the user at the 24th accepted report (level 8)', async () => {
      mockRepo.incrementAcceptedReports.mockResolvedValue(24);
      mockRepo.suspendUser.mockResolvedValue([
        { id: 'user1', email: 'offender@test.com' },
        {},
      ]);

      await acceptUserReport();

      expect(mockRepo.suspendUser).toHaveBeenCalledWith('user1');
      expect(mockRepo.applyTemporaryPenalty).not.toHaveBeenCalled();
      expect(mockEmail.sendAccountSuspendedEmail).toHaveBeenCalledWith(
        'offender@test.com',
      );
    });
  });

  describe('hideContent', () => {
    it('throws BadRequestException for an invalid type', async () => {
      await expect(service.hideContent('bogus', 'x1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws NotFoundException if the review does not exist', async () => {
      mockRepo.findActiveReview.mockResolvedValue(null);
      await expect(service.hideContent('review', 'r1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('hides an active review', async () => {
      mockRepo.findActiveReview.mockResolvedValue({ id: 'r1' });
      await service.hideContent('review', 'r1');
      expect(mockRepo.hideReviewIfActive).toHaveBeenCalledWith('r1');
    });

    it('throws NotFoundException if the comment does not exist', async () => {
      mockRepo.findActiveComment.mockResolvedValue(null);
      await expect(service.hideContent('comment', 'c1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('hides an active comment', async () => {
      mockRepo.findActiveComment.mockResolvedValue({ id: 'c1' });
      await service.hideContent('comment', 'c1');
      expect(mockRepo.hideCommentIfActive).toHaveBeenCalledWith('c1');
    });
  });

  describe('suspendUser', () => {
    it('throws NotFoundException if the user does not exist', async () => {
      mockRepo.findActiveUser.mockResolvedValue(null);
      await expect(service.suspendUser('u1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('suspends an existing active user', async () => {
      mockRepo.findActiveUser.mockResolvedValue({ id: 'u1' });
      await service.suspendUser('u1');
      expect(mockRepo.suspendUser).toHaveBeenCalledWith('u1');
    });
  });
});
