import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private repository: Repository<Ticket>,
  ) {}

  async create(createDto: CreateTicketDto) {
    // get company from session
    const o = await this.repository.create(createDto);
    await this.repository.save(o);
    return o;
  }

  async findAll() {
    const o = await this.repository.find();

    return o;
  }

  async findOne(id: number) {
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateDto: UpdateTicketDto) {
    // change count only
    await this.repository.update(id, updateDto);
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
