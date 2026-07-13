var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { CATALOG_QUEUE } from '../../events/events.constants.js';
import { CatalogSyncService } from '../catalog-sync.service.js';
import { CATALOG_SYNC_JOB_NAME } from '../catalog.constants.js';
let CatalogQueueProcessor = class CatalogQueueProcessor extends WorkerHost {
    catalogSyncService;
    constructor(catalogSyncService) {
        super();
        this.catalogSyncService = catalogSyncService;
    }
    async process(job) {
        if (job.name !== CATALOG_SYNC_JOB_NAME)
            return;
        await this.catalogSyncService.syncStaleArtists();
    }
};
CatalogQueueProcessor = __decorate([
    Injectable(),
    Processor(CATALOG_QUEUE),
    __metadata("design:paramtypes", [CatalogSyncService])
], CatalogQueueProcessor);
export { CatalogQueueProcessor };
//# sourceMappingURL=catalog-queue.processor.js.map