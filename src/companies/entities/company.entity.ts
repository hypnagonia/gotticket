import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/entities/user.entity';

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

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
