var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { BullMqJobScheduler } from '../../common/scheduling/bullmq-job-scheduler.js';
import { TRENDING_QUEUE } from '../../events/events.constants.js';
import { TRENDING_JOB_NAME, TRENDING_RECALC_INTERVAL_MS, TRENDING_SCHEDULER_ID, } from '../trending.constants.js';
let TrendingScheduler = class TrendingScheduler extends BullMqJobScheduler {
    constructor(queue) {
        super(queue, TRENDING_SCHEDULER_ID, TRENDING_JOB_NAME, {
            every: TRENDING_RECALC_INTERVAL_MS,
        });
    }
};
TrendingScheduler = __decorate([
    Injectable(),
    __param(0, InjectQueue(TRENDING_QUEUE)),
    __metadata("design:paramtypes", [Function])
], TrendingScheduler);
export { TrendingScheduler };
//# sourceMappingURL=trending.scheduler.js.map