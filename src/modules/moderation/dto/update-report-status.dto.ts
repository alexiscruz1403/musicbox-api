import { IsIn } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateReportStatusDto {
  @IsIn(['REVIEWED', 'DISMISSED'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  status!: 'REVIEWED' | 'DISMISSED';
}
