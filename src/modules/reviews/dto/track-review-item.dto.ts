import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';

export class TrackReviewItemDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  deezerId!: string;

  // Múltiplos de 0.25 (1, 1.25, ..., 10) — docs/fase-3-features.md.
  @IsNumber({}, { message: i18nValidationMessage('validation.IS_NUMBER') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  @Max(10, { message: i18nValidationMessage('validation.MAX') })
  @IsQuarterPointRating({
    message: i18nValidationMessage('validation.QUARTER_POINT_RATING'),
  })
  rating!: number;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(0, 1000, { message: i18nValidationMessage('validation.LENGTH') })
  description?: string;
}
