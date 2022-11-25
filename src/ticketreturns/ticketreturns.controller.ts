import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketreturnsService } from './ticketreturns.service';
import { CreateTicketreturnDto } from './dto/create-ticketreturn.dto';
import { UpdateTicketreturnDto } from './dto/update-ticketreturn.dto';

@Controller('ticketreturns')
export class TicketreturnsController {
  constructor(private readonly ticketreturnsService: TicketreturnsService) {}

  @Post()
  create(@Body() createTicketreturnDto: CreateTicketreturnDto) {
    return this.ticketreturnsService.create(createTicketreturnDto);
  }

  @Get()
  findAll() {
    return this.ticketreturnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketreturnsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketreturnDto: UpdateTicketreturnDto,
  ) {
    return this.ticketreturnsService.update(+id, updateTicketreturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketreturnsService.remove(+id);
  }
}
