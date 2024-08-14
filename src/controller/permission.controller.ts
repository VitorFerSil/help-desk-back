import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';
import * as yup from 'yup';

import { RoutePermission } from 'src/entity';
import { PermissionsService } from 'src/service';
import { CreateRoutesPermissions, HTTPMethods, ROUTES } from 'src/types';

@Controller(ROUTES.PERMISSIONS)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll(): Promise<RoutePermission[]> {
    return this.permissionsService.findAll();
  }

  @Post()
  async create(@Body() createBody: Partial<RoutePermission>) {
    const createRoutesPermissionsSchema: yup.ObjectSchema<CreateRoutesPermissions> =
      yup.object({
        name: yup.string().required(),
        route: yup.mixed<ROUTES>().oneOf(Object.values(ROUTES)).required(),
        method: yup
          .array()
          .of(
            yup
              .mixed<HTTPMethods>()
              .oneOf(Object.values(HTTPMethods))
              .required()
          )
          .required(),
        organization: yup.string().uuid().required()
      });

    try {
      createRoutesPermissionsSchema.validateSync(createBody, {
        abortEarly: false
      });
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    return this.permissionsService.create(createBody);
  }
}
