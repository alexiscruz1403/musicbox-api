var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsIn, IsString, IsUUID, Length } from 'class-validator';
export class CreateReportDto {
    targetType;
    targetId;
    reason;
}
__decorate([
    IsIn(['REVIEW', 'COMMENT', 'USER']),
    __metadata("design:type", String)
], CreateReportDto.prototype, "targetType", void 0);
__decorate([
    IsUUID(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "targetId", void 0);
__decorate([
    IsString(),
    Length(1, 500),
    __metadata("design:type", String)
], CreateReportDto.prototype, "reason", void 0);
//# sourceMappingURL=create-report.dto.js.map