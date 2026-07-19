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
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { TRENDING_TOP_N } from '../trending.constants.js';
export class ListTrendingQueryDto {
    limit = TRENDING_TOP_N;
}
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt({ message: i18nValidationMessage('validation.IS_INT') }),
    Min(1, { message: i18nValidationMessage('validation.MIN') }),
    Max(TRENDING_TOP_N, { message: i18nValidationMessage('validation.MAX') }),
    __metadata("design:type", Number)
], ListTrendingQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=list-trending-query.dto.js.map