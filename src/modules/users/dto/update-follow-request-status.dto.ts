import { IsIn } from 'class-validator';

export class UpdateFollowRequestStatusDto {
  @IsIn(['ACCEPTED', 'REJECTED'])
  status!: 'ACCEPTED' | 'REJECTED';
}
