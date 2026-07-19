import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
import { TrackReviewItemDto } from './track-review-item.dto.js';

export class CreateReviewDto {
  @IsIn(['TRACK', 'ALBUM'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  type!: 'TRACK' | 'ALBUM';

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  deezerId!: string;

  // Opcional: se puede crear una reseña solo con puntuaciones (rating de
  // track, o trackItems por canción en un álbum), sin texto de descripción.
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(1, 2000, { message: i18nValidationMessage('validation.LENGTH') })
  description?: string;

  // Múltiplos de 0.25 (1, 1.25, ..., 10) — docs/fase-3-features.md.
  @ValidateIf((o: CreateReviewDto) => o.type === 'TRACK')
  @IsNumber({}, { message: i18nValidationMessage('validation.IS_NUMBER') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  @Max(10, { message: i18nValidationMessage('validation.MAX') })
  @IsQuarterPointRating({
    message: i18nValidationMessage('validation.QUARTER_POINT_RATING'),
  })
  rating?: number;

  @ValidateIf((o: CreateReviewDto) => o.type === 'ALBUM')
  @IsArray({ message: i18nValidationMessage('validation.IS_ARRAY') })
  @ArrayMinSize(1, {
    message: i18nValidationMessage('validation.ARRAY_MIN_SIZE'),
  })
  @ValidateNested({
    each: true,
    message: i18nValidationMessage('validation.VALIDATE_NESTED'),
  })
  @Type(() => TrackReviewItemDto)
  trackItems?: TrackReviewItemDto[];
}
