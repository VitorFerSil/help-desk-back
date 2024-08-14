import { ShowEnum } from 'src/types';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { Demand } from './demand.entity';
import { User } from './user.entity';

@Entity()
export class AttachedFile extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ShowEnum })
  show: ShowEnum;

  @Column()
  url: string;

  @ManyToOne(() => Demand, (demand) => demand.files)
  demand: Demand;
}
