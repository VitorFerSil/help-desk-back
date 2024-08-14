import { HTTPMethods, ROUTES } from 'src/types';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class RoutePermission extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ROUTES, nullable: false })
  route: ROUTES;

  @Column({ type: 'enum', enum: HTTPMethods, array: true, nullable: false })
  method: HTTPMethods[];

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  users?: User[];

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;
}
