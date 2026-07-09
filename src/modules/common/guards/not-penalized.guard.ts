import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from '../../../prisma/prisma.service.js';
import type { JwtPayload } from '../../auth/strategies/jwt.strategy.js';

// Re-consulta el estado en DB en cada request en vez de confiar en el JWT
// (el access token puede tener hasta 15 min de antigüedad, ver
// docs/musicbox.md §9) — aplicar en endpoints de creación de reviews y
// comentarios (docs/musicbox.md §15, sistema de penalización).
@Injectable()
export class NotPenalizedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();
    const userId = request.user?.sub;
    if (!userId) return true;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { status: true, penalizedUntil: true },
    });
    if (!user) return true;

    if (user.status === 'SUSPENDED') {
      throw new ForbiddenException({
        code: 'ACCOUNT_SUSPENDED',
        message: 'Tu cuenta está suspendida.',
      });
    }

    if (user.penalizedUntil && user.penalizedUntil > new Date()) {
      throw new ForbiddenException({
        code: 'USER_PENALIZED',
        message:
          'No podés publicar reviews ni comentarios mientras tengas una penalización activa.',
        penalizedUntil: user.penalizedUntil,
      });
    }

    return true;
  }
}
