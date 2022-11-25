import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
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

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Company, (company) => company.events)
  company: Company;

  @ManyToOne(() => Venue, (venue) => venue.events)
  venue: Venue;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}
