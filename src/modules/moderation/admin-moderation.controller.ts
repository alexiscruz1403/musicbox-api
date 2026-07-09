import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { ListReportsQueryDto } from './dto/list-reports-query.dto.js';
import { UpdateReportStatusDto } from './dto/update-report-status.dto.js';
import { ModerationService } from './moderation.service.js';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class AdminModerationController {
  constructor(private readonly moderation: ModerationService) {}

  @Get('reports')
  async list(@Query() query: ListReportsQueryDto) {
    const result = await this.moderation.listReports(query);
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Patch('reports/:id')
  async updateStatus(
    @CurrentUser() admin: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateReportStatusDto,
  ) {
    return { data: await this.moderation.updateReportStatus(admin.sub, id, dto) };
  }

  @Patch('content/:type/:id/hide')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hideContent(@Param('type') type: string, @Param('id') id: string) {
    await this.moderation.hideContent(type, id);
  }

  @Patch('users/:id/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendUser(@Param('id') id: string) {
    await this.moderation.suspendUser(id);
  }
}
