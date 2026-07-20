import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module.js';
import { EventsModule } from '../events/events.module.js';
import { FollowRepository } from './follow.repository.js';
import { FollowService } from './follow.service.js';
import { UserSearchHistoryRepository } from './user-search-history.repository.js';
import { UserSearchHistoryService } from './user-search-history.service.js';
import { UserSearchRepository } from './user-search.repository.js';
import { UsersController } from './users.controller.js';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [EventsModule, CloudinaryModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    FollowRepository,
    FollowService,
    UserSearchRepository,
    UserSearchHistoryRepository,
    UserSearchHistoryService,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
