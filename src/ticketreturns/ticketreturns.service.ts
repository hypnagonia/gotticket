import { Injectable } from '@nestjs/common';
import { CreateTicketreturnDto } from './dto/create-ticketreturn.dto';
import { UpdateTicketreturnDto } from './dto/update-ticketreturn.dto';

@Injectable()
export class TicketreturnsService {
  create(createTicketreturnDto: CreateTicketreturnDto) {
    return 'This action adds a new ticketreturn';
  }

  findAll() {
    return `This action returns all ticketreturns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketreturn`;
  }

  update(id: number, updateTicketreturnDto: UpdateTicketreturnDto) {
    return `This action updates a #${id} ticketreturn`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketreturn`;
  }
}
