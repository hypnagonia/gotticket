import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, CreateTransactionBatchDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import {generate} from '../utils/generate'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as qr from "qr-image"
import { HttpException, HttpStatus } from '@nestjs/common';
import {generateTicketNumberEmail, sendEmail} from '../utils/sendEmail'



@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
  ) {}

  async create(createDto: CreateTransactionDto) {
    // get company from session

    // @ts-ignore
    /*
    const number = '' + createDto.ticket + generate(0)

    const o = await this.repository.create({...createDto, number});
    await this.repository.save(o);

    const mail = generateTicketNumberEmail(number)
    sendEmail(mail)
    return o;
    */
  }

  async createManyAndEmail(createDto: CreateTransactionBatchDto) {
    console.log({createDto})
    // todo

    // @ts-ignore
    if (!createDto || !createDto.emails || !createDto.emails.length) {
      throw new HttpException('emails should be an array', HttpStatus.NOT_FOUND);
    }

   // @ts-ignore
   const emails = createDto.emails
   const response = []
   const dto = {...createDto }

   // @ts-ignore
   delete dto.emails

   for (const email of emails) {
      // @ts-ignore
      const number = '' + createDto.ticket + generate(0)

      const o = await this.repository.create({...dto, number});


      await this.repository.save(o);

      const mail = generateTicketNumberEmail(email, number);
      sendEmail(mail);
      response.push(o)
    }

    return response;
  }

  async findAll() {
    // todo remove
    const o = await this.repository.find();

    return o;
  }

  async findOneImage(id: string) {
    const o = await this.repository.findOne({ where: { number: id } });
    if (o) {
      // const frontendURL = process.env.FRONTEND_URL
      // const frontendScannerURL = `${frontendURL}/Scanner/`

      const code = qr.image(o.number, { type: 'svg' });
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
