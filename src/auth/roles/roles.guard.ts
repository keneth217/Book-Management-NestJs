import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Retrieve the required roles set by the @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    this.logger.log(`User roles: ${JSON.stringify(user?.roles)}`);
    this.logger.log(`Required roles: ${requiredRoles}`);

    // If the user has no roles or roles are undefined, deny access
    if (!user?.roles || user.roles.length === 0) {
      this.logger.warn('No roles found for the user');
      throw new ForbiddenException(
        'You do not have the required permissions to access this resource.',
      );
    }

    // Ensure that user.roles is a flat array, then map to role names
    const userRoles = Array.isArray(user.roles) ? user.roles.flat() : [];

    // Filter out any undefined or null role names
    const validUserRoles = userRoles.filter((roleName) => roleName != null);

    const hasRole = requiredRoles.some((role) => validUserRoles.includes(role));

    // If the user doesn't have the required role, deny access and log the event
    if (!hasRole) {
      this.logger.warn(
        `Access denied. User roles: ${validUserRoles}, required roles: ${requiredRoles}`,
      );
      throw new ForbiddenException(
        'You do not have the required permissions to access this resource.',
      );
    }

    return hasRole;
  }
}
