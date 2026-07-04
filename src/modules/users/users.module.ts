import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module.js';
import { ReviewsModule } from '../reviews/reviews.module.js';
import { UsersController } from './users.controller.js';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [ReviewsModule, EventsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
