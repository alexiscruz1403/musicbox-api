import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import sanitizeHtml from 'sanitize-html';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UsersRepository,
    private readonly config: ConfigService,
    private readonly events: SocialEventsProducer,
  ) {
    cloudinary.config({
      cloud_name: config.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: config.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: config.getOrThrow<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async getMe(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user)
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });

    const [reviewCount, followersCount, followingCount] =
      await this.repo.getStats(userId);
    return { user, stats: { reviewCount, followersCount, followingCount } };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    if (dto.handle) {
      const existing = await this.repo.findByHandle(dto.handle);
      if (existing && existing.id !== userId) {
        throw new ConflictException({
          code: 'HANDLE_TAKEN',
          message: 'El handle ya está en uso.',
        });
      }
    }

    const sanitized: UpdateProfileDto = {
      ...dto,
      ...(dto.displayName && {
        displayName: sanitizeHtml(dto.displayName, {
          allowedTags: [],
          allowedAttributes: {},
        }),
      }),
      ...(dto.bio && {
        bio: sanitizeHtml(dto.bio, { allowedTags: [], allowedAttributes: {} }),
      }),
    };

    return this.repo.updateProfile(userId, sanitized);
  }

  async uploadAvatar(userId: string, buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'avatars', resource_type: 'image' },
        (error, result) => {
          if (error || !result)
            return reject(new Error(error?.message ?? 'Upload failed'));
          this.repo
            .updateAvatarUrl(userId, result.secure_url)
            .then(() => {
              resolve(result.secure_url);
            })
            .catch((err: unknown) =>
              reject(err instanceof Error ? err : new Error(String(err))),
            );
        },
      );
      stream.end(buffer);
    });
  }

  async deleteAccount(userId: string) {
    await this.repo.anonimize(userId);
  }

  async exportAccountData(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user)
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });

    const { passwordHash: _pw, googleId: _gid, ...profile } = user;
    const data = await this.repo.getExportData(userId);

    return {
      profile,
      reviews: data.reviews,
      comments: data.comments,
      reactions: data.reactions,
      follows: {
        followers: data.followers.map((f) => f.follower),
        following: data.following.map((f) => f.followee),
      },
      notificationPreferences: data.notifPrefs,
      exportedAt: new Date().toISOString(),
    };
  }

  async getNotifPrefs(userId: string) {
    const prefs = await this.repo.getNotifPrefs(userId);
    if (!prefs)
      throw new NotFoundException({
        code: 'PREFS_NOT_FOUND',
        message: 'Preferencias no encontradas.',
      });
    return prefs;
  }

  async updateNotifPrefs(userId: string, dto: UpdateNotifPrefsDto) {
    return this.repo.updateNotifPrefs(userId, dto);
  }

  async checkHandle(
    handle: string,
    currentUserId?: string,
  ): Promise<{ available: boolean }> {
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(handle)) {
      throw new BadRequestException({
        code: 'HANDLE_INVALID_FORMAT',
        message:
          'El handle solo puede contener letras, números y guiones bajos (3–30 caracteres).',
      });
    }
    const existing = await this.repo.findByHandle(handle);
    return { available: !existing || existing.id === currentUserId };
  }

  async getPublicProfile(handle: string, viewerId?: string) {
    const user = await this.repo.findByHandle(handle);
    if (!user || user.status === 'DELETED') {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });
    }

    const [reviewCount, followersCount, followingCount] =
      await this.repo.getStats(user.id);

    let isFollowing = false;
    if (viewerId) {
      isFollowing = !!(await this.repo.followExists(viewerId, user.id));
    }

    const {
      email: _email,
      passwordHash: _pw,
      googleId: _gid,
      deletedAt: _da,
      ...publicFields
    } = user;
    return {
      user: publicFields,
      stats: { reviewCount, followersCount, followingCount },
      isFollowing,
    };
  }

  async searchUsers(
    q: string,
    cursor?: string,
    limit?: number,
    viewerId?: string,
  ) {
    return this.repo.searchUsers(q.trim(), cursor, limit, viewerId);
  }

  async getFollowers(handle: string, cursor?: string, limit?: number) {
    return this.repo.getFollowers(handle, cursor, limit);
  }

  async getFollowing(handle: string, cursor?: string, limit?: number) {
    return this.repo.getFollowing(handle, cursor, limit);
  }

  async follow(followerId: string, handle: string) {
    const target = await this.repo.findByHandle(handle);
    if (!target || target.status === 'DELETED') {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });
    }
    if (target.id === followerId) {
      throw new BadRequestException({
        code: 'CANNOT_FOLLOW_SELF',
        message: 'No puedes seguirte a ti mismo.',
      });
    }
    const exists = await this.repo.followExists(followerId, target.id);
    if (exists)
      throw new ConflictException({
        code: 'ALREADY_FOLLOWING',
        message: 'Ya sigues a este usuario.',
      });

    await this.repo.createFollow(followerId, target.id);
    await this.events.emitFollowCreated({ followerId, followeeId: target.id });
  }

  async unfollow(followerId: string, handle: string) {
    const target = await this.repo.findByHandle(handle);
    if (!target)
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });

    const exists = await this.repo.followExists(followerId, target.id);
    if (!exists)
      throw new NotFoundException({
        code: 'NOT_FOLLOWING',
        message: 'No sigues a este usuario.',
      });

    await this.repo.deleteFollow(followerId, target.id);
  }
}
