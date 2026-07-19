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
import { i18nValidationMessage } from 'nestjs-i18n';
class PushSubscriptionKeysDto {
    p256dh;
    auth;
}
__decorate([
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    MinLength(1, { message: i18nValidationMessage('validation.MIN_LENGTH') }),
    __metadata("design:type", String)
], PushSubscriptionKeysDto.prototype, "p256dh", void 0);
__decorate([
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    MinLength(1, { message: i18nValidationMessage('validation.MIN_LENGTH') }),
    __metadata("design:type", String)
], PushSubscriptionKeysDto.prototype, "auth", void 0);
export class CreatePushSubscriptionDto {
    endpoint;
    keys;
}
__decorate([
    IsUrl({ require_tld: false }, { message: i18nValidationMessage('validation.IS_URL') }),
    __metadata("design:type", String)
], CreatePushSubscriptionDto.prototype, "endpoint", void 0);
__decorate([
    ValidateNested({
        message: i18nValidationMessage('validation.VALIDATE_NESTED'),
    }),
    Type(() => PushSubscriptionKeysDto),
    __metadata("design:type", PushSubscriptionKeysDto)
], CreatePushSubscriptionDto.prototype, "keys", void 0);
//# sourceMappingURL=create-push-subscription.dto.js.map