import { IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class QuickSearchUsersDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(1, 50, { message: i18nValidationMessage('validation.LENGTH') })
  q!: string;
}
