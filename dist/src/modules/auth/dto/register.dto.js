var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Equals, IsBoolean, IsEmail, IsString, Length, Matches, MinLength, } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class RegisterDto {
    handle;
    displayName;
    email;
    password;
    consent;
}
__decorate([
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    Length(3, 30, { message: i18nValidationMessage('validation.LENGTH') }),
    Matches(/^[a-zA-Z0-9_]{3,30}$/, {
        message: i18nValidationMessage('validation.HANDLE_MATCHES'),
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "handle", void 0);
__decorate([
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    Length(1, 50, { message: i18nValidationMessage('validation.LENGTH') }),
    __metadata("design:type", String)
], RegisterDto.prototype, "displayName", void 0);
__decorate([
    IsEmail({}, { message: i18nValidationMessage('validation.IS_EMAIL') }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    IsString({ message: i18nValidationMessage('validation.IS_STRING') }),
    MinLength(8, { message: i18nValidationMessage('validation.MIN_LENGTH') }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    IsBoolean({ message: i18nValidationMessage('validation.IS_BOOLEAN') }),
    Equals(true, {
        message: i18nValidationMessage('validation.REGISTER_CONSENT_EQUALS'),
    }),
    __metadata("design:type", Boolean)
], RegisterDto.prototype, "consent", void 0);
//# sourceMappingURL=register.dto.js.map