import { IsString, Length } from 'class-validator';

export class QuickSearchUsersDto {
  @IsString()
  @Length(1, 50)
  q!: string;
}
