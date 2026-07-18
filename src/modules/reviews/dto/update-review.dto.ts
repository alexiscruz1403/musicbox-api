import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
import { TrackReviewItemDto } from './track-review-item.dto.js';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @Length(1, 2000)
  description?: string;

  // Múltiplos de 0.25 (1, 1.25, ..., 10) — docs/fase-3-features.md.
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsQuarterPointRating()
  rating?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TrackReviewItemDto)
  trackItems?: TrackReviewItemDto[];
}
