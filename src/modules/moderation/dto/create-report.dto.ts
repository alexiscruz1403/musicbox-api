import { IsIn, IsString, IsUUID, Length } from 'class-validator';

export class CreateReportDto {
  @IsIn(['REVIEW', 'COMMENT', 'USER'])
  targetType!: 'REVIEW' | 'COMMENT' | 'USER';

  @IsUUID()
  targetId!: string;

  @IsString()
  @Length(1, 500)
  reason!: string;
}
