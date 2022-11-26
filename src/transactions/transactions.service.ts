import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import {generate} from '../utils/generate'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as qr from "qr-image"
import { HttpException, HttpStatus } from '@nestjs/common';
import {generateTicketNumberEmail, sendEmail} from '../utils/sendEmail'

// todo
const frontendURL = 'https://loquacious-wisp-e9e0c7.netlify.app' // process.env.FRONTEND_URL
const frontendScannerURL = `${frontendURL}/Scanner/`
console.log({frontendScannerURL})

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
  ) {}

  async create(createDto: CreateTransactionDto) {
    // get company from session

    // @ts-ignore
    const number = '' + createDto.ticket + generate(0)

    const o = await this.repository.create({...createDto, number});
    await this.repository.save(o);

    const mail = generateTicketNumberEmail(number)
    sendEmail(mail)
    return o;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  async findOneImage(id: string) {
    const o = await this.repository.findOne({ where: { number: id } });
    if (o) {
      const code = qr.image(frontendScannerURL + o.number, { type: 'svg' });
      return code;
    }


    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    console.log('got2')
    const o = await this.repository.findOne({ where: { number: id } });
    if (o) {
      console.log({o})
      return o
    }


    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
