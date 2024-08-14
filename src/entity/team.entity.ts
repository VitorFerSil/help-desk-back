import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class Team extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.teams)
  organization: Organization;

  @OneToMany(() => User, (user) => user.team)
  users: User[];
}
