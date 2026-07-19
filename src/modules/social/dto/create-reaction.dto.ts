import { IsIn } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateReactionDto {
  @IsIn(['LIKE', 'DISLIKE'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  type!: 'LIKE' | 'DISLIKE';
}
