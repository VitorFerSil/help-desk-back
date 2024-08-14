import { Controller, Get, Param } from '@nestjs/common';

import { Organization } from 'src/entity';

import { OrganizationService } from 'src/service';
import { ROUTES } from 'src/types';

@Controller(ROUTES.CLIENT)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findById(id);
  }

  // @Post()
  // async create(
  //   @Body() createBody: CreateClientInterface
  // ): Promise<Organization> {
  //   const createClientSchema: yup.ObjectSchema<CreateClientInterface> =
  //     yup.object({
  //       acronym: yup.string().required(),
  //       name: yup.string().required(),
  //       managers: yup.array().optional(),
  //       users: yup.array().optional(),
  //       teams: yup.array().optional()
  //     });

  //   try {
  //     createClientSchema.validateSync(createBody, { abortEarly: false });
  //   } catch (error) {
  //     throw new BadRequestException(error.errors);
  //   }

  //   return this.organizationService.create(createBody);
  // }
}
