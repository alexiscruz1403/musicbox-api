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
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
import { TrackReviewItemDto } from './track-review-item.dto.js';
export class UpdateReviewDto {
    description;
    rating;
    trackItems;
}
__decorate([
    IsOptional(),
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    Length(1, 2000, { message: i18nValidationMessage('validation.LENGTH') }),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsNumber({}, { message: i18nValidationMessage('validation.IS_NUMBER') }),
    Min(1, { message: i18nValidationMessage('validation.MIN') }),
    Max(10, { message: i18nValidationMessage('validation.MAX') }),
    IsQuarterPointRating({
        message: i18nValidationMessage('validation.QUARTER_POINT_RATING'),
    }),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
__decorate([
    IsOptional(),
    IsArray({ message: i18nValidationMessage('validation.IS_ARRAY') }),
    ArrayMinSize(1, {
        message: i18nValidationMessage('validation.ARRAY_MIN_SIZE'),
    }),
    ValidateNested({
        each: true,
        message: i18nValidationMessage('validation.VALIDATE_NESTED'),
    }),
    Type(() => TrackReviewItemDto),
    __metadata("design:type", Array)
], UpdateReviewDto.prototype, "trackItems", void 0);
//# sourceMappingURL=update-review.dto.js.map