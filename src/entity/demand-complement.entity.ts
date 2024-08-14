import { ShowEnum } from 'src/types';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Demand } from './demand.entity';

@Entity()
export class Complement extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Complement, { nullable: true })
  reply?: Complement;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ShowEnum })
  show: ShowEnum;

  @ManyToOne(() => Demand, (demand) => demand.complement)
  demand: Demand;
}
