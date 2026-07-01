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
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, MinLength, } from 'class-validator';
export class SearchCatalogDto {
    q;
    type;
    limit = 20;
    cursor;
}
__decorate([
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], SearchCatalogDto.prototype, "q", void 0);
__decorate([
    IsEnum(['album', 'track', 'artist']),
    __metadata("design:type", String)
], SearchCatalogDto.prototype, "type", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(50),
    __metadata("design:type", Number)
], SearchCatalogDto.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SearchCatalogDto.prototype, "cursor", void 0);
//# sourceMappingURL=search-catalog.dto.js.map