import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

/*
{
  "name": "any venue",
  "address": "villa 52",
  "description": "no description",
  "capacity": 100
}
*/

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column()
  public description: string;

  @Column()
  public capacity: number;

  @OneToMany(() => Event, (event) => event.venue)
  events: Event[];
}
