import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';
import type { CreateReactionDto } from './dto/create-reaction.dto.js';
import type { ListCommentsQueryDto } from './dto/list-comments-query.dto.js';
import type { UpdateCommentDto } from './dto/update-comment.dto.js';
import { SocialRepository } from './social.repository.js';

const SANITIZE_OPTIONS = { allowedTags: [], allowedAttributes: {} };

@Injectable()
export class SocialService {
  constructor(
    private readonly repo: SocialRepository,
    private readonly events: SocialEventsProducer,
  ) {}

  async getReviewStats(reviewIds: string[], viewerId?: string) {
    return this.repo.getReviewStats(reviewIds, viewerId);
  }

  async react(userId: string, reviewId: string, dto: CreateReactionDto) {
    const review = await this.getActiveReviewOrThrow(reviewId);
    await this.assertReviewVisible(review.userId, userId);
    const existing = await this.repo.findReaction(userId, reviewId);
    const reaction = await this.repo.upsertReaction(userId, reviewId, dto.type);

    if (!existing) {
      await this.events.emitReactionAdded({
        reactionId: reaction.id,
        reviewId,
        reviewOwnerId: review.userId,
        userId,
        type: dto.type,
      });
    } else if (existing.type !== dto.type) {
      await this.events.emitReactionChanged({
        reactionId: reaction.id,
        reviewId,
        reviewOwnerId: review.userId,
        userId,
        type: dto.type,
      });
    }

    return reaction;
  }

  async removeReaction(userId: string, reviewId: string) {
    const review = await this.getActiveReviewOrThrow(reviewId);
    await this.assertReviewVisible(review.userId, userId);
    const existing = await this.repo.findReaction(userId, reviewId);
    if (!existing) {
      throw new NotFoundException({
        code: 'REACTION_NOT_FOUND',
        message: 'No has reaccionado a esta reseña.',
      });
    }
    await this.repo.deleteReaction(userId, reviewId);
  }

  async listComments(
    reviewId: string,
    query: ListCommentsQueryDto,
    viewerId?: string,
  ) {
    const review = await this.getActiveReviewOrThrow(reviewId);
    await this.assertReviewVisible(review.userId, viewerId);
    return this.repo.listComments(reviewId, query.cursor, query.limit);
  }

  async createComment(userId: string, reviewId: string, dto: CreateCommentDto) {
    const review = await this.getActiveReviewOrThrow(reviewId);
    await this.assertReviewVisible(review.userId, userId);
    const content = sanitizeHtml(dto.content, SANITIZE_OPTIONS);
    const comment = await this.repo.createComment({
      userId,
      reviewId,
      content,
    });
    await this.events.emitCommentCreated({
      commentId: comment.id,
      reviewId,
      reviewOwnerId: review.userId,
      userId,
    });
    return comment;
  }

  async updateComment(userId: string, id: string, dto: UpdateCommentDto) {
    await this.getOwnedActiveComment(userId, id);
    const content = sanitizeHtml(dto.content, SANITIZE_OPTIONS);
    return this.repo.updateComment(id, content);
  }

  async removeComment(userId: string, id: string) {
    await this.getOwnedActiveComment(userId, id);
    await this.repo.softDeleteComment(id);
  }

  private async getActiveReviewOrThrow(reviewId: string) {
    const review = await this.repo.getActiveReviewOwner(reviewId);
    if (!review) {
      throw new NotFoundException({
        code: 'REVIEW_NOT_FOUND',
        message: 'Reseña no encontrada.',
      });
    }
    return review;
  }

  // Si el detalle de la reseña está bloqueado (perfil privado del dueño),
  // tampoco se puede leer/crear comentarios ni reaccionar sobre ella.
  private async assertReviewVisible(ownerId: string, viewerId?: string) {
    const visible = await this.repo.isOwnerVisibleTo(ownerId, viewerId);
    if (!visible) {
      throw new ForbiddenException({
        code: 'PRIVATE_PROFILE',
        message: 'Este perfil es privado.',
      });
    }
  }

  private async getActiveComment(id: string) {
    const comment = await this.repo.findCommentById(id);
    if (!comment || comment.deletedAt || comment.status !== 'ACTIVE') {
      throw new NotFoundException({
        code: 'COMMENT_NOT_FOUND',
        message: 'Comentario no encontrado.',
      });
    }
    return comment;
  }

  private async getOwnedActiveComment(userId: string, id: string) {
    const comment = await this.getActiveComment(id);
    if (comment.userId !== userId) {
      throw new ForbiddenException({
        code: 'NOT_COMMENT_OWNER',
        message: 'No puedes modificar este comentario.',
      });
    }
    return comment;
  }
}
