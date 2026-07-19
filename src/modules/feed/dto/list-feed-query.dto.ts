import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export type FeedMode = 'FOLLOWED' | 'ALL';

export class ListFeedQueryDto {
  @IsOptional()
  @IsIn(['FOLLOWED', 'ALL'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  type: FeedMode = 'FOLLOWED';

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
