import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListReportsQueryDto {
  @IsOptional()
  @IsIn(['PENDING', 'REVIEWED', 'DISMISSED'])
  status?: 'PENDING' | 'REVIEWED' | 'DISMISSED';

  @IsOptional()
  @IsIn(['REVIEW', 'COMMENT', 'USER'])
  targetType?: 'REVIEW' | 'COMMENT' | 'USER';

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
