import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { I18nResolver } from 'nestjs-i18n';
export declare class JwtLanguageResolver implements I18nResolver {
    private readonly jwt;
    constructor(jwt: JwtService);
    resolve(context: ExecutionContext): string | undefined;
}
