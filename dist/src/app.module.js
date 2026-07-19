var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { ModerationModule } from './modules/moderation/moderation.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { RecommendationsModule } from './modules/recommendations/recommendations.module.js';
import { ReviewsModule } from './modules/reviews/reviews.module.js';
import { SocialModule } from './modules/social/social.module.js';
import { TrendingModule } from './modules/trending/trending.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: configValidationSchema,
            }),
            LoggerModule.forRoot({
                pinoHttp: {
                    transport: process.env['NODE_ENV'] !== 'production'
                        ? { target: 'pino-pretty', options: { singleLine: true } }
                        : undefined,
                },
            }),
            PrismaModule,
            RedisModule,
            EmailModule,
            CloudinaryModule,
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
                useFactory: (redis) => ({
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
        ],
        controllers: [AppController],
        providers: [
            AppService,
            { provide: APP_GUARD, useClass: JwtAuthGuard },
            { provide: APP_GUARD, useClass: ThrottlerGuard },
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map