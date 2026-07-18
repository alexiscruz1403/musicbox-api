var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNumber, IsOptional, IsString, Length, Max, Min, } from 'class-validator';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
export class TrackReviewItemDto {
    deezerId;
    rating;
    description;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], TrackReviewItemDto.prototype, "deezerId", void 0);
__decorate([
    IsNumber(),
    Min(1),
    Max(10),
    IsQuarterPointRating(),
    __metadata("design:type", Number)
], TrackReviewItemDto.prototype, "rating", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Length(0, 1000),
    __metadata("design:type", String)
], TrackReviewItemDto.prototype, "description", void 0);
//# sourceMappingURL=track-review-item.dto.js.map