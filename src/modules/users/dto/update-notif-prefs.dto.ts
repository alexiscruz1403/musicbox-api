import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotifPrefsDto {
  @IsOptional()
  @IsBoolean()
  likesEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  dislikesEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  commentsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  followersEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  reviewsEnabled?: boolean;
}
