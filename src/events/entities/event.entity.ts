import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Venue } from '../../venues/entities/venue.entity';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

/*
{
"name": "new super event",
"company": 1,
"venue": 1,
"image": "no",
"description": "no",
"markdown": "no",
"eventDate": "2022-11-25T12:53:04.915Z"
}
*/

export enum EventStatus {
  OPEN = 'open',
  CANCELED = 'canceled',
  CLOSED = 'closed',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public image: string;

  @Column()
  public description: string;

  @Column()
  public markdown: string;

  @Column({ type: 'timestamptz' })
  eventDate: Date;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.OPEN,
  })
  status: EventStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Company, (company) => company.events, {
    nullable: false,
    eager: true,
  })
  company: Company;

  @ManyToOne(() => Venue, (venue) => venue.events, {
    nullable: false,
    eager: true,
  })
  // @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Ticket, (ticket) => ticket.event, { eager: true })
  tickets: Ticket[];
}
