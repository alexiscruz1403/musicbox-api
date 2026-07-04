import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { SocialService } from './social.service.js';

@Controller('comments')
export class CommentsController {
  constructor(private readonly social: SocialService) {}

  @Patch(':id')
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return { data: await this.social.updateComment(user.sub, id, dto) };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    await this.social.removeComment(user.sub, id);
  }
}
