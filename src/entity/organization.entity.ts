import { OrganizationEnum } from 'src/types';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Demand } from './demand.entity';
import { RoutePermission } from './route-permission.entity';
import { Team } from './team.entity';
import { User } from './user.entity';

@Entity()
export class Organization extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  acronym: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: OrganizationEnum, unique: true })
  type: OrganizationEnum;

  @OneToMany(() => User, (user) => user.organization, {
    nullable: true
  })
  users: User[];

  @OneToMany(() => Team, (team) => team.organization, {
    nullable: true
  })
  teams: Team[];

  @OneToMany(() => Demand, (demand) => demand.client, {
    nullable: true
  })
  demands: Demand[];

  @ManyToMany(() => RoutePermission, { nullable: true })
  @JoinTable()
  routesPermissions?: RoutePermission[];

  @OneToMany(() => Organization, (organization) => organization.parent, {
    nullable: true
  })
  clients: Organization[];

  @ManyToOne(() => Organization, (organization) => organization.clients, {
    nullable: true
  })
  parent: Organization;
}
