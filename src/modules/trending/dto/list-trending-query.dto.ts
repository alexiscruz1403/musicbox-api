import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { TRENDING_TOP_N } from '../trending.constants.js';

export class ListTrendingQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(TRENDING_TOP_N)
  limit: number = TRENDING_TOP_N;
}
