var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Length, Max, Min, ValidateNested, } from 'class-validator';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
import { TrackReviewItemDto } from './track-review-item.dto.js';
export class UpdateReviewDto {
    description;
    rating;
    trackItems;
}
__decorate([
    IsOptional(),
    IsString(),
    Length(1, 2000),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(1),
    Max(10),
    IsQuarterPointRating(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMinSize(1),
    ValidateNested({ each: true }),
    Type(() => TrackReviewItemDto),
    __metadata("design:type", Array)
], UpdateReviewDto.prototype, "trackItems", void 0);
//# sourceMappingURL=update-review.dto.js.map