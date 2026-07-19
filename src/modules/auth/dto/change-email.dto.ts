import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ChangeEmailDto {
  @IsEmail({}, { message: i18nValidationMessage('validation.IS_EMAIL') })
  newEmail: string;
}
