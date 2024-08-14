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
import { Complement } from './demand-complement.entity';
import { AttachedFile } from './demand-file.entity';
import { DemandHistoric } from './demand-historic.entity';
import { DemandStatus } from './demand-status.entity';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class Demand extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Organization, { nullable: false })
  client: Organization;

  @ManyToMany(() => User)
  @JoinTable()
  clientUser: User[];

  @ManyToMany(() => User)
  @JoinTable()
  organizationUser: User[];

  @ManyToOne(() => DemandStatus)
  status: DemandStatus;

  @Column()
  priority: string;

  @Column()
  severity: string;

  @Column()
  deadlineDate: Date;

  @Column()
  topic: string;

  @Column()
  nature: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  @OneToMany(() => DemandHistoric, (historic) => historic.demand)
  historic?: DemandHistoric[];

  @OneToMany(() => Complement, (complement) => complement.demand)
  complement?: Complement[];

  @OneToMany(() => AttachedFile, (file) => file.demand)
  files?: AttachedFile[];

  @ManyToMany(() => Demand)
  @JoinTable()
  bonds?: Demand[];
}
