import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import type { Language, UserRole, UserStatus } from '../../../../generated/prisma/client.js';
export interface JwtPayload {
    sub: string;
    handle: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    language: Language;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
