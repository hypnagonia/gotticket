import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createDto: CreateUserDto) {
    const o = await this.repository.create(createDto);
    await this.repository.save(o);
    return o;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string) {
    const o = await this.repository.findOne({ where: { email } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateDto: UpdateUserDto) {
    await this.repository.update(id, updateDto);
    const o = await this.repository.findOne({ where: { id } });
    if (o) {
      return o;
    }

    throw new HttpException('record not found', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
