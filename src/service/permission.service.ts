import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization, RoutePermission } from 'src/entity';
import { HTTPMethods, ROUTES } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(RoutePermission)
    private routesPermissionsRepository: Repository<RoutePermission>
  ) {}

  async findAll(): Promise<RoutePermission[]> {
    return await this.routesPermissionsRepository.find();
  }

  async findByRouteAndMethod(
    route: ROUTES,
    method: HTTPMethods,
    organizationId: Organization
  ): Promise<RoutePermission | undefined> {
    console.log({ route, method });
    console.log(organizationId);

    const routePermission = await this.routesPermissionsRepository.findOne({
      where: {
        route: route,
        method: method,
        organization: organizationId
      },
      relations: ['users'] // Certifique-se de carregar a relação 'users'
    });

    return routePermission;
  }

  async create(createBody: Partial<RoutePermission>): Promise<RoutePermission> {
    const permission = this.routesPermissionsRepository.create(createBody);
    return await this.routesPermissionsRepository.save(permission);
  }
}
