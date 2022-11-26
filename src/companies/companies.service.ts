import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private repository: Repository<Company>,
  ) {}

  async create(createDto: CreateCompanyDto) {
    const o = await this.repository.create(createDto);
    await this.repository.save(o);
    return o;
  }

  findAll() {
    // anyone
    return this.repository.find();
  }

  async findOne(id: number) {
    // anyone
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateDto: UpdateCompanyDto) {
    // only admin not needed ?
    await this.repository.update(id, updateDto);
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    // only admin not needed
    const o = await this.repository.delete(id);
    if (!o.affected) {
      throw new HttpException('record not found', HttpStatus.NOT_FOUND);
    }
  }
}
