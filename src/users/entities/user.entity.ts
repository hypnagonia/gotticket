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
import { Role } from '../../auth/roles';
/*

{
"email": "hgonia@gmail.com",
"name": "j",
"phone": "+971504252550",
"password": "123"
}

*/

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  @IsMobilePhone()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.VISITOR,
  })
  role: Role;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  //??
  @OneToMany(() => Event, (event) => event.company)
  events: Event[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
