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
import { CATALOG_QUEUE } from '../../events/events.constants.js';
import { CATALOG_SYNC_CRON_PATTERN, CATALOG_SYNC_JOB_NAME, CATALOG_SYNC_SCHEDULER_ID, } from '../catalog.constants.js';
let CatalogScheduler = class CatalogScheduler extends PgBossJobScheduler {
    constructor(pgBoss) {
        super(pgBoss, CATALOG_QUEUE, CATALOG_SYNC_JOB_NAME, CATALOG_SYNC_CRON_PATTERN, CATALOG_SYNC_SCHEDULER_ID);
    }
};
CatalogScheduler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PgBossService])
], CatalogScheduler);
export { CatalogScheduler };
//# sourceMappingURL=catalog.scheduler.js.map