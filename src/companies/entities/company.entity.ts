import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Event, (event) => event.company)
  events: Event[];
}
