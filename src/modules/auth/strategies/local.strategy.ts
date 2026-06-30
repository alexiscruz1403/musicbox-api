import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { JwtPayload } from './jwt.strategy.js';
import { AuthService } from '../auth.service.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<JwtPayload> {
    const user = await this.authService.validateLocalUser(email, password);
    if (!user)
      throw new UnauthorizedException({
        code: 'INVALID_CREDENTIALS',
        message: 'Email o contraseña incorrectos.',
      });
    return user;
  }
}
