import { IsString, IsUUID } from 'class-validator';

export class ConfirmChangeEmailDto {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;
}
