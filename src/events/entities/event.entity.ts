import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Venue } from '../../venues/entities/venue.entity';

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
}
