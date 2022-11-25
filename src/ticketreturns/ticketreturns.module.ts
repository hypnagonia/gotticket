import { Module } from '@nestjs/common';
import { TicketreturnsService } from './ticketreturns.service';
import { TicketreturnsController } from './ticketreturns.controller';

@Module({
  controllers: [TicketreturnsController],
  providers: [TicketreturnsService],
})
export class TicketreturnsModule {}
