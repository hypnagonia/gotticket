import { Role } from './roles';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { ROLES_KEY } from './roles.decorator';
import { Reflector } from '@nestjs/core';

export const RolesGuard = (roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return roles.includes(user.role) || user.role === Role.ADMIN;
    }
  }

  return mixin(RoleGuardMixin);
};
