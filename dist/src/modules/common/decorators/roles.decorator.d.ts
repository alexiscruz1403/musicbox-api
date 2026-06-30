import type { UserStatus } from '../../../../generated/prisma/client.js';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserStatus[]) => import("@nestjs/common").CustomDecorator<string>;
