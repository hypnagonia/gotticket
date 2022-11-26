import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
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
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

/*
{
"ticket": 45
}
*/

export enum TransactionTicketStatus {
  ISSUED = 'issued',
  USED = 'used',
  RETURNED = 'returned',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public id: number;

  // need a second number as get parameter
  @Column()
  number: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: TransactionTicketStatus,
    default: TransactionTicketStatus.ISSUED,
  })
  status: TransactionTicketStatus;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.transactions, { nullable: false, eager: true })
  ticket: Ticket;
}
