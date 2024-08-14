import { Controller } from '@nestjs/common';
import { OrganizationService } from 'src/service';
import { ROUTES } from 'src/types';

@Controller(ROUTES.ORGANIZATION)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
}
