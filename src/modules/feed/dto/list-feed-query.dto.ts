import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export type FeedMode = 'FOLLOWED' | 'ALL';

export class ListFeedQueryDto {
  @IsOptional()
  @IsIn(['FOLLOWED', 'ALL'])
  type: FeedMode = 'FOLLOWED';

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;
}
