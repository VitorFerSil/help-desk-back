import { OrganizationRoleEnum } from '../enums';

export interface CreateInitialUserInterface {
  name: string;
  password: string;
  email: string;
  organization: string;
  role: OrganizationRoleEnum;
}
