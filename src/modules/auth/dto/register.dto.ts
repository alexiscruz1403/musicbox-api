import {
  Equals,
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(3, 30, { message: i18nValidationMessage('validation.LENGTH') })
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message: i18nValidationMessage('validation.HANDLE_MATCHES'),
  })
  handle: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(1, 50, { message: i18nValidationMessage('validation.LENGTH') })
  displayName: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.IS_EMAIL') })
  email: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(8, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  password: string;

  @IsBoolean({ message: i18nValidationMessage('validation.IS_BOOLEAN') })
  @Equals(true, {
    message: i18nValidationMessage('validation.REGISTER_CONSENT_EQUALS'),
  })
  consent!: boolean;
}
