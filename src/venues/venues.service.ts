import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Venue} from './entities/venue.entity'
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    return 'This action adds a new venue';
    const newVenue = await this.venueRepository.create(createVenueDto);
    await this.venueRepository.save(newVenue);
    return newVenue;
  }

  findAll() {
    return this.venueRepository.find();
  }

  async findOne(id: number) {
    const venue = await this.venueRepository.findOne({where: {id}});
    if (venue) {
      return venue;
    }

    throw new HttpException('venue not found', HttpStatus.NOT_FOUND);
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
