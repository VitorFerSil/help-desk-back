import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  OrganizationService,
  PermissionsService,
  UserService
} from 'src/service';
import { HTTPMethods, ROUTES } from 'src/types';

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly routesPermissionsService: PermissionsService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      const { userId, organizationId, expiresIn } = decoded;

      // Verificar se o token expirou
      if (Date.now() > expiresIn) {
        throw new UnauthorizedException('Token expired');
      }

      const organization =
        await this.organizationService.findById(organizationId);

      const user = organization.users.find((user) => user.id === userId);

      if (!user) {
        throw new UnauthorizedException('User not found in organization');
      }

      const rawRoute = req.params[0];

      const route = rawRoute as ROUTES;
      const method = `{${req.method}}` as HTTPMethods;

      const routePermission =
        await this.routesPermissionsService.findByRouteAndMethod(
          route,
          method,
          organization
        );

      console.log(`Route permission found: ${JSON.stringify(routePermission)}`);

      if (routePermission) {
        const hasPermission = routePermission.users.some(
          (permissionUser) => permissionUser.id === userId
        );

        if (!hasPermission) {
          throw new UnauthorizedException('User does not have permission');
        }
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
