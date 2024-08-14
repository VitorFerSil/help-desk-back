import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class OrganizationRole extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  role: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Organization)
  organization: Organization;
}
