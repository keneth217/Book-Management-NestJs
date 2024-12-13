import { SetMetadata } from '@nestjs/common';

// Change this to accept strings for role names
export const ROLES_KEY = 'roles';

// Accept role names (strings) as arguments instead of Role entities
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
