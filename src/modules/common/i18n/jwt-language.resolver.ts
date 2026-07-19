import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { I18nResolver } from 'nestjs-i18n';
import type { Request } from 'express';
import type { JwtPayload } from '../../auth/strategies/jwt.strategy.js';

// El idioma no es un dato sensible: se decodifica el access token sin
// verificar su firma (JwtAuthGuard ya valida la autenticación por su cuenta,
// en un paso posterior del pipeline). Esto permite resolver el idioma antes
// de que corra ningún guard, ya que el middleware de nestjs-i18n se ejecuta
// primero (docs/fase-9-features.md).
@Injectable()
export class JwtLanguageResolver implements I18nResolver {
  constructor(private readonly jwt: JwtService) {}

  resolve(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers?.['authorization'];
    if (!header?.startsWith('Bearer ')) return undefined;

    const token = header.slice('Bearer '.length);
    try {
      const payload = this.jwt.decode<JwtPayload>(token);
      return payload?.language;
    } catch {
      return undefined;
    }
  }
}
