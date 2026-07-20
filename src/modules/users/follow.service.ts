import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { FollowRepository } from './follow.repository.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class FollowService {
  constructor(
    private readonly repo: FollowRepository,
    private readonly usersRepo: UsersRepository,
    private readonly events: SocialEventsProducer,
  ) {}

  async getFollowers(
    handle: string,
    cursor?: string,
    limit?: number,
    viewerId?: string,
  ) {
    return this.repo.getFollowers(handle, cursor, limit, viewerId);
  }

  async getFollowing(
    handle: string,
    cursor?: string,
    limit?: number,
    viewerId?: string,
  ) {
    return this.repo.getFollowing(handle, cursor, limit, viewerId);
  }

  // Extraído de UsersService.getPublicProfile — sin viewer, siempre false sin
  // tocar la base de datos.
  async getFollowStatus(
    viewerId: string | undefined,
    targetId: string,
  ): Promise<{ isFollowing: boolean; followRequestPending: boolean }> {
    if (!viewerId) return { isFollowing: false, followRequestPending: false };

    const isFollowing = !!(await this.repo.followExists(viewerId, targetId));
    if (isFollowing) return { isFollowing: true, followRequestPending: false };

    const request = await this.repo.findFollowRequest(viewerId, targetId);
    return {
      isFollowing: false,
      followRequestPending: request?.status === 'PENDING',
    };
  }

  async follow(
    followerId: string,
    handle: string,
  ): Promise<
    { status: 'FOLLOWING' } | { status: 'PENDING'; followRequestId: string }
  > {
    const target = await this.usersRepo.findByHandle(handle);
    if (!target || target.status === 'DELETED') {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
      });
    }
    if (target.id === followerId) {
      throw new BadRequestException({
        code: 'CANNOT_FOLLOW_SELF',
      });
    }
    const exists = await this.repo.followExists(followerId, target.id);
    if (exists)
      throw new ConflictException({
        code: 'ALREADY_FOLLOWING',
      });

    if (!target.isPrivate) {
      await this.repo.createFollow(followerId, target.id);
      await this.events.emitFollowCreated({
        followerId,
        followeeId: target.id,
      });
      return { status: 'FOLLOWING' };
    }

    const existingRequest = await this.repo.findFollowRequest(
      followerId,
      target.id,
    );
    if (existingRequest?.status === 'PENDING') {
      throw new ConflictException({
        code: 'FOLLOW_REQUEST_ALREADY_SENT',
      });
    }

    const request = await this.repo.createOrResetFollowRequest(
      followerId,
      target.id,
    );
    await this.events.emitFollowRequested({
      requesterId: followerId,
      targetId: target.id,
    });
    return { status: 'PENDING', followRequestId: request.id };
  }

  async unfollow(followerId: string, handle: string) {
    const target = await this.usersRepo.findByHandle(handle);
    if (!target)
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
      });

    const exists = await this.repo.followExists(followerId, target.id);
    if (exists) {
      await this.repo.deleteFollow(followerId, target.id);
      return;
    }

    const pendingRequest = await this.repo.findFollowRequest(
      followerId,
      target.id,
    );
    if (pendingRequest?.status === 'PENDING') {
      await this.repo.deleteFollowRequest(followerId, target.id);
      return;
    }

    throw new NotFoundException({
      code: 'NOT_FOLLOWING',
    });
  }

  async listFollowRequests(userId: string, cursor?: string, limit?: number) {
    const result = await this.repo.listIncomingFollowRequests(
      userId,
      cursor,
      limit,
    );
    return {
      items: result.items.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        requester: r.requester,
      })),
      nextCursor: result.nextCursor,
    };
  }

  async respondToFollowRequest(
    userId: string,
    requestId: string,
    status: 'ACCEPTED' | 'REJECTED',
  ) {
    const request = await this.repo.findFollowRequestById(requestId);
    if (!request) {
      throw new NotFoundException({
        code: 'FOLLOW_REQUEST_NOT_FOUND',
      });
    }
    if (request.targetId !== userId) {
      throw new ForbiddenException({
        code: 'NOT_FOLLOW_REQUEST_TARGET',
      });
    }
    if (request.status !== 'PENDING') {
      throw new ConflictException({
        code: 'FOLLOW_REQUEST_ALREADY_RESOLVED',
      });
    }

    if (status === 'REJECTED') {
      // Sin notificación al rechazar — requisito explícito.
      return this.repo.rejectFollowRequest(requestId);
    }

    const accepted = await this.repo.acceptFollowRequest(requestId);
    await this.events.emitFollowRequestAccepted({
      requesterId: accepted.requesterId,
      accepterId: userId,
    });
    return accepted;
  }

  // Al pasar un perfil de privado a público, el gate de aprobación deja de
  // tener sentido — todas las solicitudes PENDING se resuelven como
  // aceptadas (docs/fase-7-features.md, sección de perfiles privados).
  // Llamado desde UsersService.updateProfile en la transición isPrivate
  // true -> false.
  async acceptAllPendingFollowRequests(targetId: string): Promise<void> {
    const requesterIds =
      await this.repo.acceptAllPendingFollowRequests(targetId);
    await Promise.all(
      requesterIds.map((requesterId) =>
        this.events.emitFollowRequestAccepted({
          requesterId,
          accepterId: targetId,
        }),
      ),
    );
  }
}
