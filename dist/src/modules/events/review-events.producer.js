var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../pgboss/pgboss.service.js';
import { REVIEWS_QUEUE } from './events.constants.js';
let ReviewEventsProducer = class ReviewEventsProducer {
    pgBoss;
    constructor(pgBoss) {
        this.pgBoss = pgBoss;
    }
    emitCreated(payload) {
        return this.pgBoss.boss.send(REVIEWS_QUEUE, {
            event: 'review.created',
            payload,
        });
    }
    emitUpdated(payload) {
        return this.pgBoss.boss.send(REVIEWS_QUEUE, {
            event: 'review.updated',
            payload,
        });
    }
    emitDeleted(payload) {
        return this.pgBoss.boss.send(REVIEWS_QUEUE, {
            event: 'review.deleted',
            payload,
        });
    }
};
ReviewEventsProducer = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PgBossService])
], ReviewEventsProducer);
export { ReviewEventsProducer };
//# sourceMappingURL=review-events.producer.js.map