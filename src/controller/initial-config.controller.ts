import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post
} from '@nestjs/common';
import * as yup from 'yup';

import { Organization, User } from 'src/entity';
import { OrganizationService, UserService } from 'src/service';
import {
  CreateInitialUserInterface,
  CreateOrganizationInterface,
  OrganizationRoleEnum,
  ROUTES,
  ROUTES_INITIAL
} from 'src/types';

@Controller(ROUTES_INITIAL.INITIAL_CONFIG)
export class InitialConfigController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService
  ) {}

  @Post(ROUTES.ORGANIZATION)
  async createOrg(
    @Body() createBody: CreateOrganizationInterface,
    @Headers('token') token: string
  ): Promise<Organization> {
    const createOrgSchema: yup.ObjectSchema<
      CreateOrganizationInterface & { token: string }
    > = yup.object({
      acronym: yup.string().required(),
      name: yup.string().required(),
      token: yup.string().uuid().required()
    });

    try {
      createOrgSchema.validateSync(
        { ...createBody, token },
        { abortEarly: false }
      );
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const adminToken = process.env.ADMIN_TOKEN;
    if (token !== adminToken) {
      throw new BadRequestException('Invalid token');
    }

    return this.organizationService.createInitialOrganization(createBody);
  }

  @Post(ROUTES.USER)
  async createUser(
    @Body() createBody: CreateInitialUserInterface,
    @Headers('token') token: string
  ): Promise<User> {
    const createUsersSchema: yup.ObjectSchema<
      CreateInitialUserInterface & { token: string }
    > = yup.object({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      organization: yup.string().uuid().required(),
      token: yup.string().uuid().required(),
      role: yup
        .mixed<OrganizationRoleEnum>()
        .oneOf(Object.values(OrganizationRoleEnum))
        .required()
    });

    try {
      createUsersSchema.validateSync(
        { ...createBody, token },
        { abortEarly: false }
      );
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const adminToken = process.env.ADMIN_TOKEN;
    if (token !== adminToken) {
      throw new BadRequestException('Invalid token');
    }

    return this.userService.createInitialUser(createBody);
  }
}
