import { Complement } from './demand-complement.entity';
import { AttachedFile } from './demand-file.entity';
import { DemandHistoric } from './demand-historic.entity';
import { DemandStatus } from './demand-status.entity';
import { Demand } from './demand.entity';
import { OrganizationRole } from './organization-role.entity';
import { Organization } from './organization.entity';
import { RoutePermission } from './route-permission.entity';
import { Team } from './team.entity';
import { User } from './user.entity';

export * from './base-core.entity';
export * from './demand-complement.entity';
export * from './demand-file.entity';
export * from './demand-historic.entity';
export * from './demand-status.entity';
export * from './demand.entity';
export * from './organization-role.entity';
export * from './organization.entity';
export * from './route-permission.entity';
export * from './team.entity';
export * from './user.entity';

export const ENTITIES_ARRAY = [
  AttachedFile,
  Complement,
  Demand,
  DemandHistoric,
  DemandStatus,
  Organization,
  OrganizationRole,
  RoutePermission,
  Team,
  User
];
