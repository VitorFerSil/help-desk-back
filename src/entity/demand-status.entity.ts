import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CoreEntity } from './base-core.entity';
import { User } from './user.entity';

@Entity()
export class DemandStatus extends CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User)
  user: User;
}
