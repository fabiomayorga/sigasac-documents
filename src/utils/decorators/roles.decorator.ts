import { SetMetadata } from '@nestjs/common';

/**
 *
 * @param ...roles Array de Roles
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
