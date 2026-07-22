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
import { SOCIAL_QUEUE } from './events.constants.js';
let SocialEventsProducer = class SocialEventsProducer {
    pgBoss;
    constructor(pgBoss) {
        this.pgBoss = pgBoss;
    }
    emitReactionAdded(payload) {
        return this.pgBoss.boss.send(SOCIAL_QUEUE, {
            event: 'reaction.added',
            payload,
        });
    }
    emitReactionChanged(payload) {
        return this.pgBoss.boss.send(SOCIAL_QUEUE, {
            event: 'reaction.changed',
            payload,
        });
    }
    emitCommentCreated(payload) {
        return this.pgBoss.boss.send(SOCIAL_QUEUE, {
            event: 'comment.created',
            payload,
        });
    }
    emitFollowCreated(payload) {
        return this.pgBoss.boss.send(SOCIAL_QUEUE, {
            event: 'follow.created',
            payload,
        });
    }
    emitFollowRequested(payload) {
        return this.pgBoss.boss.send(SOCIAL_QUEUE, {
            event: 'follow.requested',
            payload,
        });
    }
    emitFollowRequestAccepted(payload) {
        return this.pgBoss.boss.send(SOCIAL_QUEUE, {
            event: 'follow.request.accepted',
            payload,
        });
    }
};
SocialEventsProducer = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PgBossService])
], SocialEventsProducer);
export { SocialEventsProducer };
//# sourceMappingURL=social-events.producer.js.map