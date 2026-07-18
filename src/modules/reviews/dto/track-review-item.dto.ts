import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';

export class TrackReviewItemDto {
  @IsString()
  deezerId!: string;

  // Múltiplos de 0.25 (1, 1.25, ..., 10) — docs/fase-3-features.md.
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsQuarterPointRating()
  rating!: number;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
