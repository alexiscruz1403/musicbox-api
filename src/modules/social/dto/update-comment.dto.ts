import { IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateCommentDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(1, 1000, { message: i18nValidationMessage('validation.LENGTH') })
  content!: string;
}
