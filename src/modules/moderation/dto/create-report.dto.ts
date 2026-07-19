import { IsIn, IsString, IsUUID, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateReportDto {
  @IsIn(['REVIEW', 'COMMENT', 'USER'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  targetType!: 'REVIEW' | 'COMMENT' | 'USER';

  @IsUUID(undefined, { message: i18nValidationMessage('validation.IS_UUID') })
  targetId!: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(1, 500, { message: i18nValidationMessage('validation.LENGTH') })
  reason!: string;
}
