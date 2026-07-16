import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module.js';
import { EventsModule } from '../events/events.module.js';
import { ReviewsModule } from '../reviews/reviews.module.js';
import { UserSearchHistoryRepository } from './user-search-history.repository.js';
import { UserSearchHistoryService } from './user-search-history.service.js';
import { UsersController } from './users.controller.js';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [ReviewsModule, EventsModule, CloudinaryModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UserSearchHistoryRepository,
    UserSearchHistoryService,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
