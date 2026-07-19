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
import { i18nValidationMessage } from 'nestjs-i18n';

export type UserReviewSortMode = 'recent' | 'oldest' | 'best' | 'worst';

export class ListUserReviewsQueryDto {
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  @Max(50, { message: i18nValidationMessage('validation.MAX') })
  limit: number = 10;

  @IsOptional()
  @IsIn(['recent', 'oldest', 'best', 'worst'], {
    message: i18nValidationMessage('validation.IS_IN'),
  })
  sort: UserReviewSortMode = 'recent';

  // Non-exact/partial filter over the reviewed track/album title or artist
  // name (matches Review.externalTitle/externalArtistName) — combinable with
  // sort, docs/fase-3-features.md.
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(1, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  @MaxLength(100, { message: i18nValidationMessage('validation.MAX_LENGTH') })
  q?: string;
}
