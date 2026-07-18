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
import { IsQuarterPointRating } from './quarter-point-rating.validator.js';
import { TrackReviewItemDto } from './track-review-item.dto.js';

export class CreateReviewDto {
  @IsIn(['TRACK', 'ALBUM'])
  type!: 'TRACK' | 'ALBUM';

  @IsString()
  deezerId!: string;

  // Opcional: se puede crear una reseña solo con puntuaciones (rating de
  // track, o trackItems por canción en un álbum), sin texto de descripción.
  @IsOptional()
  @IsString()
  @Length(1, 2000)
  description?: string;

  // Múltiplos de 0.25 (1, 1.25, ..., 10) — docs/fase-3-features.md.
  @ValidateIf((o: CreateReviewDto) => o.type === 'TRACK')
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsQuarterPointRating()
  rating?: number;

  @ValidateIf((o: CreateReviewDto) => o.type === 'ALBUM')
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TrackReviewItemDto)
  trackItems?: TrackReviewItemDto[];
}
