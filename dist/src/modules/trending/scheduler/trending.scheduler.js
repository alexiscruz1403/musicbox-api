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
import { PgBossJobScheduler } from '../../common/scheduling/pgboss-job-scheduler.js';
import { TRENDING_QUEUE } from '../../events/events.constants.js';
import { TRENDING_CRON_PATTERN, TRENDING_JOB_NAME, TRENDING_SCHEDULER_ID, } from '../trending.constants.js';
let TrendingScheduler = class TrendingScheduler extends PgBossJobScheduler {
    constructor(pgBoss) {
        super(pgBoss, TRENDING_QUEUE, TRENDING_JOB_NAME, TRENDING_CRON_PATTERN, TRENDING_SCHEDULER_ID);
    }
};
TrendingScheduler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PgBossService])
], TrendingScheduler);
export { TrendingScheduler };
//# sourceMappingURL=trending.scheduler.js.map