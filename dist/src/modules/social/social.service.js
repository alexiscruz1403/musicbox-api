var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { SocialRepository } from './social.repository.js';
const SANITIZE_OPTIONS = { allowedTags: [], allowedAttributes: {} };
let SocialService = class SocialService {
    repo;
    events;
    constructor(repo, events) {
        this.repo = repo;
        this.events = events;
    }
    async getReviewStats(reviewIds, viewerId) {
        return this.repo.getReviewStats(reviewIds, viewerId);
    }
    async react(userId, reviewId, dto) {
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
        }
        else if (existing.type !== dto.type) {
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
    async removeReaction(userId, reviewId) {
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
    async listComments(reviewId, query, viewerId) {
        const review = await this.getActiveReviewOrThrow(reviewId);
        await this.assertReviewVisible(review.userId, viewerId);
        return this.repo.listComments(reviewId, query.cursor, query.limit);
    }
    async createComment(userId, reviewId, dto) {
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
    async updateComment(userId, id, dto) {
        await this.getOwnedActiveComment(userId, id);
        const content = sanitizeHtml(dto.content, SANITIZE_OPTIONS);
        return this.repo.updateComment(id, content);
    }
    async removeComment(userId, id) {
        await this.getOwnedActiveComment(userId, id);
        await this.repo.softDeleteComment(id);
    }
    async getActiveReviewOrThrow(reviewId) {
        const review = await this.repo.getActiveReviewOwner(reviewId);
        if (!review) {
            throw new NotFoundException({
                code: 'REVIEW_NOT_FOUND',
                message: 'Reseña no encontrada.',
            });
        }
        return review;
    }
    async assertReviewVisible(ownerId, viewerId) {
        const visible = await this.repo.isOwnerVisibleTo(ownerId, viewerId);
        if (!visible) {
            throw new ForbiddenException({
                code: 'PRIVATE_PROFILE',
                message: 'Este perfil es privado.',
            });
        }
    }
    async getActiveComment(id) {
        const comment = await this.repo.findCommentById(id);
        if (!comment || comment.deletedAt || comment.status !== 'ACTIVE') {
            throw new NotFoundException({
                code: 'COMMENT_NOT_FOUND',
                message: 'Comentario no encontrado.',
            });
        }
        return comment;
    }
    async getOwnedActiveComment(userId, id) {
        const comment = await this.getActiveComment(id);
        if (comment.userId !== userId) {
            throw new ForbiddenException({
                code: 'NOT_COMMENT_OWNER',
                message: 'No puedes modificar este comentario.',
            });
        }
        return comment;
    }
};
SocialService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [SocialRepository,
        SocialEventsProducer])
], SocialService);
export { SocialService };
//# sourceMappingURL=social.service.js.map