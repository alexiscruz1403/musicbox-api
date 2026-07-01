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
import type { CatalogSearchType } from '../providers/music-catalog.provider.js';

export class SearchCatalogDto {
  @IsString()
  @MinLength(1)
  q!: string;

  @IsEnum(['album', 'track', 'artist'])
  type!: CatalogSearchType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;

  @IsOptional()
  @IsString()
  cursor?: string;
}
