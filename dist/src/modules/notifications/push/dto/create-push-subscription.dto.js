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
import { IsString, IsUrl, ValidateNested, MinLength } from 'class-validator';
class PushSubscriptionKeysDto {
    p256dh;
    auth;
}
__decorate([
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], PushSubscriptionKeysDto.prototype, "p256dh", void 0);
__decorate([
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], PushSubscriptionKeysDto.prototype, "auth", void 0);
export class CreatePushSubscriptionDto {
    endpoint;
    keys;
}
__decorate([
    IsUrl({ require_tld: false }),
    __metadata("design:type", String)
], CreatePushSubscriptionDto.prototype, "endpoint", void 0);
__decorate([
    ValidateNested(),
    Type(() => PushSubscriptionKeysDto),
    __metadata("design:type", PushSubscriptionKeysDto)
], CreatePushSubscriptionDto.prototype, "keys", void 0);
//# sourceMappingURL=create-push-subscription.dto.js.map