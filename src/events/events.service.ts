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
    // anyone
    const o = await this.repository.find();

    return o;
  }

  async findOne(id: number) {
    // anyone
    //  relations: ['userId', 'offerId'],
    /*
    ...findOne({
    select: {
        id: true,
        createdAt: true,
        userId: {
          id: true,
          name: true,
        },
        offerId: {
          id: true,
          offerDrescription: true,
        },
      },
      ...
      where: {...},
})
    */
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateDto: UpdateEventDto) {
    // only company
    // event update flow?
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
