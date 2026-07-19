import { IsIn } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateFollowRequestStatusDto {
  @IsIn(['ACCEPTED', 'REJECTED'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  status!: 'ACCEPTED' | 'REJECTED';
}
