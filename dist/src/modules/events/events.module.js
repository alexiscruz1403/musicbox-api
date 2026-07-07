var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { DEFAULT_JOB_OPTIONS, NOTIFICATIONS_QUEUE, RECOMMENDATIONS_QUEUE, REVIEWS_QUEUE, SOCIAL_QUEUE, TRENDING_QUEUE, } from './events.constants.js';
import { ReviewEventsProducer } from './review-events.producer.js';
import { SocialEventsProducer } from './social-events.producer.js';
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    Global(),
    Module({
        imports: [
            BullModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    connection: new Redis(config.getOrThrow('REDIS_URL'), {
                        maxRetriesPerRequest: null,
                    }),
                }),
            }),
            BullModule.registerQueue({ name: REVIEWS_QUEUE, defaultJobOptions: DEFAULT_JOB_OPTIONS }, { name: SOCIAL_QUEUE, defaultJobOptions: DEFAULT_JOB_OPTIONS }, { name: NOTIFICATIONS_QUEUE, defaultJobOptions: DEFAULT_JOB_OPTIONS }, { name: TRENDING_QUEUE, defaultJobOptions: DEFAULT_JOB_OPTIONS }, { name: RECOMMENDATIONS_QUEUE, defaultJobOptions: DEFAULT_JOB_OPTIONS }),
        ],
        providers: [ReviewEventsProducer, SocialEventsProducer],
        exports: [ReviewEventsProducer, SocialEventsProducer],
    })
], EventsModule);
export { EventsModule };
//# sourceMappingURL=events.module.js.map