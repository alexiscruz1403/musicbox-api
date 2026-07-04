import { IsIn } from 'class-validator';

export class CreateReactionDto {
  @IsIn(['LIKE', 'DISLIKE'])
  type!: 'LIKE' | 'DISLIKE';
}
