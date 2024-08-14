import { HTTPMethods } from '../http-methods';
import { ROUTES } from '../routes';

export interface CreateRoutesPermissions {
  name: string;
  route: ROUTES;
  method: HTTPMethods[];
  organization: string;
}
