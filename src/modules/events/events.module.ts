import { Global, Module } from '@nestjs/common';
import { ReviewEventsProducer } from './review-events.producer.js';
import { SocialEventsProducer } from './social-events.producer.js';

// Bus de eventos del dominio. Los producers publican en las colas pg-boss vía
// PgBossService (@Global) — ya no hay conexión Redis/BullMQ dedicada. Las
// colas se crean en PgBossService al arrancar; los workers viven en cada
// módulo consumidor (Notifications/Trending/Recommendations/FollowSuggestions).
@Global()
@Module({
  providers: [ReviewEventsProducer, SocialEventsProducer],
  exports: [ReviewEventsProducer, SocialEventsProducer],
})
export class EventsModule {}
