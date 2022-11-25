import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
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

/*

{
email: "hgonia@gmail.com",
name: "some name",
phone: "+971504252550"
}

*/
export enum UserRole {
  ADMIN = 'admin',
  CONDUCTOR = 'conductor',
  COMPANY = 'company',
  VISITOR = 'visitor',
}

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
  @IsMobilePhone()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VISITOR,
  })
  role: UserRole;
}
