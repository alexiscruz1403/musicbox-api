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
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
export class TrackReviewItemDto {
    deezerId;
    rating;
    description;
}
__decorate([
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    __metadata("design:type", String)
], TrackReviewItemDto.prototype, "deezerId", void 0);
__decorate([
    IsNumber({}, { message: i18nValidationMessage('validation.IS_NUMBER') }),
    Min(1, { message: i18nValidationMessage('validation.MIN') }),
    Max(10, { message: i18nValidationMessage('validation.MAX') }),
    IsQuarterPointRating({
        message: i18nValidationMessage('validation.QUARTER_POINT_RATING'),
    }),
    __metadata("design:type", Number)
], TrackReviewItemDto.prototype, "rating", void 0);
__decorate([
    IsOptional(),
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    Length(0, 1000, { message: i18nValidationMessage('validation.LENGTH') }),
    __metadata("design:type", String)
], TrackReviewItemDto.prototype, "description", void 0);
//# sourceMappingURL=track-review-item.dto.js.map