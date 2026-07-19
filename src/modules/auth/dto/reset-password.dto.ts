import { IsString, IsUUID, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ResetPasswordDto {
  @IsUUID(undefined, { message: i18nValidationMessage('validation.IS_UUID') })
  userId: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  token: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(8, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  newPassword: string;
}
