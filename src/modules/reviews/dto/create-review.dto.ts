import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { TrackReviewItemDto } from './track-review-item.dto.js';

export class CreateReviewDto {
  @IsIn(['TRACK', 'ALBUM'])
  type!: 'TRACK' | 'ALBUM';

  @IsString()
  deezerId!: string;

  @IsString()
  @Length(1, 2000)
  description!: string;

  @ValidateIf((o: CreateReviewDto) => o.type === 'TRACK')
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @ValidateIf((o: CreateReviewDto) => o.type === 'ALBUM')
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TrackReviewItemDto)
  trackItems?: TrackReviewItemDto[];
}
