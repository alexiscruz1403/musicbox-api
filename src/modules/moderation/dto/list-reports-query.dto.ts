import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ListReportsQueryDto {
  @IsOptional()
  @IsIn(['PENDING', 'REVIEWED', 'DISMISSED'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  status?: 'PENDING' | 'REVIEWED' | 'DISMISSED';

  @IsOptional()
  @IsIn(['REVIEW', 'COMMENT', 'USER'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  targetType?: 'REVIEW' | 'COMMENT' | 'USER';

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  @Max(50, { message: i18nValidationMessage('validation.MAX') })
  limit: number = 20;
}
