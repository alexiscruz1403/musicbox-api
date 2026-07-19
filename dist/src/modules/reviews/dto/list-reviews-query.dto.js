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
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class ListReviewsQueryDto {
    cursor;
    limit = 10;
    sort = 'recent';
}
__decorate([
    IsOptional(),
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    __metadata("design:type", String)
], ListReviewsQueryDto.prototype, "cursor", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt({ message: i18nValidationMessage('validation.IS_INT') }),
    Min(1, { message: i18nValidationMessage('validation.MIN') }),
    Max(50, { message: i18nValidationMessage('validation.MAX') }),
    __metadata("design:type", Number)
], ListReviewsQueryDto.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    IsIn(['recent', 'rating'], {
        message: i18nValidationMessage('validation.IS_IN'),
    }),
    __metadata("design:type", String)
], ListReviewsQueryDto.prototype, "sort", void 0);
//# sourceMappingURL=list-reviews-query.dto.js.map