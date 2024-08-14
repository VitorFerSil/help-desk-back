import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';

import { GenderEnum, OrganizationRoleEnum } from 'src/types';
import { CoreEntity } from './base-core.entity';
import { OrganizationRole } from './organization-role.entity';
import { Organization } from './organization.entity';
import { Team } from './team.entity';

@Entity()
export class User extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender?: GenderEnum;

  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @Column({ nullable: true })
  cellphone?: string;

  @Column({ nullable: true })
  telephone?: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ type: 'enum', enum: OrganizationRoleEnum })
  role: OrganizationRoleEnum;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: true
  })
  organization: Organization;

  @ManyToMany(() => Team, (team) => team.users, { nullable: true })
  @JoinTable()
  team: Team[];

  @ManyToOne(() => OrganizationRole, { nullable: true })
  organizationRole?: OrganizationRole;
}
