import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { configValidationSchema } from './config/config.validation.js';
import { EmailModule } from './email/email.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RedisModule } from './redis/redis.module.js';
import { RedisService } from './redis/redis.service.js';
import { ThrottlerRedisStorage } from './redis/throttler-redis.storage.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CommonModule } from './modules/common/common.module.js';
import { JwtAuthGuard } from './modules/common/guards/jwt-auth.guard.js';
import { UsersModule } from './modules/users/users.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { EventsModule } from './modules/events/events.module.js';
import { FeedModule } from './modules/feed/feed.module.js';
import { FollowSuggestionsModule } from './modules/follow-suggestions/follow-suggestions.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { ReviewsModule } from './modules/reviews/reviews.module.js';
import { SocialModule } from './modules/social/social.module.js';
import { TrendingModule } from './modules/trending/trending.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env['NODE_ENV'] !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),
    PrismaModule,
    RedisModule,
    EmailModule,
    ThrottlerModule.forRootAsync({
      inject: [RedisService],
      useFactory: (redis: RedisService) => ({
        throttlers: [{ ttl: 900, limit: 100 }],
        storage: new ThrottlerRedisStorage(redis.client),
      }),
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    CatalogModule,
    EventsModule,
    ReviewsModule,
    SocialModule,
    FeedModule,
    FollowSuggestionsModule,
    TrendingModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
