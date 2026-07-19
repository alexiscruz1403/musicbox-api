import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { TRENDING_TOP_N } from '../trending.constants.js';

export class ListTrendingQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  @Max(TRENDING_TOP_N, { message: i18nValidationMessage('validation.MAX') })
  limit: number = TRENDING_TOP_N;
}
