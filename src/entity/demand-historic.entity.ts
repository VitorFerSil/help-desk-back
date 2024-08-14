import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Demand } from './demand.entity';
import { User } from './user.entity';

@Entity()
export class DemandHistoric extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  statusFrom?: string;

  @Column({ nullable: true })
  statusTo?: string;

  @Column({ default: false })
  newComplement?: boolean;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Demand, (demand) => demand.historic)
  demand: Demand;
}
