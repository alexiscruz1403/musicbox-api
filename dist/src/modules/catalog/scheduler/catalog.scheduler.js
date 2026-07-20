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
import { CATALOG_QUEUE } from '../../events/events.constants.js';
import { CATALOG_SYNC_CRON_PATTERN, CATALOG_SYNC_JOB_NAME, CATALOG_SYNC_SCHEDULER_ID, } from '../catalog.constants.js';
let CatalogScheduler = class CatalogScheduler extends BullMqJobScheduler {
    constructor(queue) {
        super(queue, CATALOG_SYNC_SCHEDULER_ID, CATALOG_SYNC_JOB_NAME, {
            pattern: CATALOG_SYNC_CRON_PATTERN,
        });
    }
};
CatalogScheduler = __decorate([
    Injectable(),
    __param(0, InjectQueue(CATALOG_QUEUE)),
    __metadata("design:paramtypes", [Function])
], CatalogScheduler);
export { CatalogScheduler };
//# sourceMappingURL=catalog.scheduler.js.map