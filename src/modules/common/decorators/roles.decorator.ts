import { SetMetadata } from '@nestjs/common';
import type { UserStatus } from '../../../../generated/prisma/client.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserStatus[]) => SetMetadata(ROLES_KEY, roles);
