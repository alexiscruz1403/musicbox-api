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
  followsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  followRequestsEnabled?: boolean;
}
