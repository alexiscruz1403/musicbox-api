import { fileURLToPath } from 'node:url';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { configValidationSchema } from './config/config.validation.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { EmailModule } from './email/email.module.js';
import { PgBossModule } from './pgboss/pgboss.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RedisModule } from './redis/redis.module.js';
import { RedisService } from './redis/redis.service.js';
import { ThrottlerRedisStorage } from './redis/throttler-redis.storage.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CommonModule } from './modules/common/common.module.js';
import { JwtAuthGuard } from './modules/common/guards/jwt-auth.guard.js';
import { JwtLanguageResolver } from './modules/common/i18n/jwt-language.resolver.js';
import { UsersModule } from './modules/users/users.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { EventsModule } from './modules/events/events.module.js';
import { FeedModule } from './modules/feed/feed.module.js';
import { FollowSuggestionsModule } from './modules/follow-suggestions/follow-suggestions.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ModerationModule } from './modules/moderation/moderation.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { RecommendationsModule } from './modules/recommendations/recommendations.module.js';
import { ReviewsModule } from './modules/reviews/reviews.module.js';
import { SocialModule } from './modules/social/social.module.js';
import { TrendingModule } from './modules/trending/trending.module.js';

@Module({
  imports: [
    // La instrumentación de Sentry se configura en instrument.ts (Sentry.init
    // con nestIntegration), importado al tope de main.ts — @sentry/nestjs v10
    // ya no expone un SentryModule. La captura de errores se hace en
    // HttpExceptionFilter (Sentry.captureException en la rama de 5xx).
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
        // Redacción defensiva de credenciales/PII en los logs locales
        // (complementa el scrubbing de Sentry en instrument.ts).
        redact: [
          'req.headers.authorization',
          'req.headers.cookie',
          'req.body.password',
          'req.body.currentPassword',
          'req.body.newPassword',
          'req.body.token',
          'req.body.refreshToken',
        ],
      },
    }),
    PrismaModule,
    RedisModule,
    PgBossModule,
    EmailModule,
    CloudinaryModule,
    // Fase 9 — Internacionalización (docs/fase-9-features.md). Resolución de
    // idioma: claim `language` del JWT (sin verificar firma — JwtAuthGuard ya
    // autentica en un paso posterior) → header Accept-Language → fallback en.
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: fileURLToPath(new URL('./i18n/', import.meta.url)),
          watch: process.env['NODE_ENV'] !== 'production',
        },
      }),
      resolvers: [JwtLanguageResolver, AcceptLanguageResolver],
      imports: [JwtModule.register({})],
    }),
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
    RecommendationsModule,
    ModerationModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
