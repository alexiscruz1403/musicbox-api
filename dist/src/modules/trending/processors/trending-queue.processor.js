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
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { TRENDING_QUEUE, } from '../../events/events.constants.js';
import { TRENDING_JOB_NAME } from '../trending.constants.js';
import { TrendingService } from '../trending.service.js';
let TrendingQueueProcessor = class TrendingQueueProcessor {
    trendingService;
    pgBoss;
    constructor(trendingService, pgBoss) {
        this.trendingService = trendingService;
        this.pgBoss = pgBoss;
    }
    async onApplicationBootstrap() {
        await this.pgBoss.boss.work(TRENDING_QUEUE, (jobs) => this.handleBatch(jobs));
    }
    async handleBatch(jobs) {
        for (const { data } of jobs) {
            if (data.event !== TRENDING_JOB_NAME)
                continue;
            await this.trendingService.recalculate();
        }
    }
};
TrendingQueueProcessor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TrendingService,
        PgBossService])
], TrendingQueueProcessor);
export { TrendingQueueProcessor };
//# sourceMappingURL=trending-queue.processor.js.map