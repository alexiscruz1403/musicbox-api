var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CatalogModule } from '../catalog/catalog.module.js';
import { EventsModule } from '../events/events.module.js';
import { SocialModule } from '../social/social.module.js';
import { AlbumTrackReviewsController } from './album-track-reviews.controller.js';
import { ReviewsController } from './reviews.controller.js';
import { ReviewsRepository } from './reviews.repository.js';
import { ReviewsService } from './reviews.service.js';
let ReviewsModule = class ReviewsModule {
};
ReviewsModule = __decorate([
    Module({
        imports: [CatalogModule, EventsModule, SocialModule],
        controllers: [ReviewsController, AlbumTrackReviewsController],
        providers: [ReviewsService, ReviewsRepository],
        exports: [ReviewsService],
    })
], ReviewsModule);
export { ReviewsModule };
//# sourceMappingURL=reviews.module.js.map