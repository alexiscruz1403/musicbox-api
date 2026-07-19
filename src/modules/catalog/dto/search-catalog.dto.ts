import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import type { CatalogSearchType } from '../providers/music-catalog.provider.js';

export class SearchCatalogDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(1, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  q!: string;

  @IsEnum(['album', 'track', 'artist'], {
    message: i18nValidationMessage('validation.IS_ENUM'),
  })
  type!: CatalogSearchType;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  @Max(50, { message: i18nValidationMessage('validation.MAX') })
  limit: number = 20;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  cursor?: string;
}
