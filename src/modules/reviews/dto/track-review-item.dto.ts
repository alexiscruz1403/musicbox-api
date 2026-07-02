import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class TrackReviewItemDto {
  @IsString()
  deezerId!: string;

  @IsInt()
  @Min(1)
  @Max(10)
  rating!: number;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
