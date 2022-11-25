import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from '../venues/entities/venue.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private repository: Repository<Event>,
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
  ) {}

  async create(createDto: CreateEventDto) {
    // get company from session
    const o = await this.repository.create(createDto);
    await this.repository.save(o);
    return o;
  }

  // TODO all find all pagination
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

  async update(id: number, updateDto: UpdateEventDto) {
    await this.repository.update(id, updateDto);
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    return;

    const o = await this.repository.delete(id);
    if (!o.affected) {
      throw new HttpException('record not found', HttpStatus.NOT_FOUND);
    }
  }
}
