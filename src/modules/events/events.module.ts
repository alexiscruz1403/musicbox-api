import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { DEFAULT_JOB_OPTIONS, REVIEWS_QUEUE } from './events.constants.js';
import { ReviewEventsProducer } from './review-events.producer.js';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // BullMQ requires its own connection with maxRetriesPerRequest: null,
        // which is incompatible with RedisService's client (used for caching
        // and idempotency) — hence a second, dedicated ioredis connection.
        connection: new Redis(config.getOrThrow<string>('REDIS_URL'), {
          maxRetriesPerRequest: null,
        }),
      }),
    }),
    BullModule.registerQueue({
      name: REVIEWS_QUEUE,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    }),
  ],
  providers: [ReviewEventsProducer],
  exports: [ReviewEventsProducer],
})
export class EventsModule {}
