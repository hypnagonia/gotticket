import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsMobilePhone,
} from 'class-validator';
import { Company } from '../../companies/entities/company.entity';
import { Event } from '../../events/entities/event.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

/*

{
"email": "hgonia@gmail.com",
"name": "some name",
"phone": "+971504252550"
}

*/
export enum TicketStatus {
  ISSUED = 'issued',
  USED = 'used',
  RETURNED = 'returned',
}

// types of tickets
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  public id: number;

  // normal, VIP
  @Column()
  name: string;

  // how many can be issued
  @Column()
  count: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @OneToMany(() => Transaction, (transaction) => transaction.ticket)
  transactions: Transaction[];
}
