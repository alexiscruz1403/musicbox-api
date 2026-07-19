import { IsString, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ConfirmChangeEmailDto {
  @IsUUID(undefined, { message: i18nValidationMessage('validation.IS_UUID') })
  userId: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  token: string;
}
