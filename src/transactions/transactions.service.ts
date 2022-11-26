import { Injectable } from '@nestjs/common';
import {
  CreateTransactionDto,
  CreateTransactionBatchDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  Transaction,
  TransactionTicketStatus,
} from './entities/transaction.entity';
import { generate } from '../utils/generate';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as qr from 'qr-image';
import { HttpException, HttpStatus } from '@nestjs/common';
import { generateTicketNumberEmail, sendEmail } from '../utils/sendEmail';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
  ) {}

  async create(createDto: CreateTransactionDto) {
    // get company from session
    // no more than ticket count
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
    // todo
    // only company role
    // no more than ticket count

    // @ts-ignore
    if (!createDto || !createDto.emails || !createDto.emails.length) {
      throw new HttpException(
        'emails should be an array',
        HttpStatus.NOT_FOUND,
      );
    }

    // @ts-ignore
    const emails = createDto.emails;
    const response = [];
    const dto = { ...createDto };

    // @ts-ignore
    delete dto.emails;

    for (const email of emails) {
      // @ts-ignore
      const number = '' + createDto.ticket + generate(0);

      const o = await this.repository.create({ ...dto, number });

      await this.repository.save(o);

      const mail = generateTicketNumberEmail(email, number);
      sendEmail(mail);
      response.push(o);
    }

    return response;
  }

  async findAll() {
    // todo remove
    const o = await this.repository.find();

    return o;
  }

  async findAllByTickedID(ticketId: number) {
    // todo optimize query
    // only company
    const o = await this.repository.find({
      where: { ticket: { id: ticketId } },
    });

    return o;
  }

  async findOneImage(id: string) {
    // anyone
    const o = await this.repository.findOne({ where: { number: id } });
    if (o) {
      // const frontendURL = process.env.FRONTEND_URL
      // const frontendScannerURL = `${frontendURL}/Scanner/`

      const code = qr.image(o.number, { type: 'svg' });
      return code;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async findOneImagePNG(id: string) {
    // anyone
    const o = await this.repository.findOne({ where: { number: id } });
    if (o) {
      // const frontendURL = process.env.FRONTEND_URL
      // const frontendScannerURL = `${frontendURL}/Scanner/`

      const code = qr.image(o.number, { type: 'png', size: 20 });
      return code;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  // by number
  async findOne(id: string) {
    const o = await this.repository.findOne({ where: { number: id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  // todo better use number instead of id
  async useTicket(id: number, updateTransactionDto: UpdateTransactionDto) {
    // only manager of company

    const current = await this.repository.findOne({ where: { id } });

    if (!current || !current.id) {
      throw new HttpException('record not found', HttpStatus.NOT_FOUND);
    }

    if (current.status !== TransactionTicketStatus.ISSUED) {
      throw new HttpException('already used', HttpStatus.NOT_FOUND);
    }

    // must be manager of issuer company
    // status must be Issued
    const newDto = {
      status: TransactionTicketStatus.USED,
    };
    await this.repository.update(id, newDto);
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
