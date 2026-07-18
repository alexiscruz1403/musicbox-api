import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export type UserReviewSortMode = 'recent' | 'oldest' | 'best' | 'worst';

export class ListUserReviewsQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;

  @IsOptional()
  @IsIn(['recent', 'oldest', 'best', 'worst'])
  sort: UserReviewSortMode = 'recent';

  // Non-exact/partial filter over the reviewed track/album title or artist
  // name (matches Review.externalTitle/externalArtistName) — combinable with
  // sort, docs/fase-3-features.md.
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  q?: string;
}
