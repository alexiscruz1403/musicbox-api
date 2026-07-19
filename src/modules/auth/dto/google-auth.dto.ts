import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class GoogleAuthDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  idToken: string;
}
