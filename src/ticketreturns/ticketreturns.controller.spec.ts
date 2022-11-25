import { Test, TestingModule } from '@nestjs/testing';
import { TicketreturnsController } from './ticketreturns.controller';
import { TicketreturnsService } from './ticketreturns.service';

describe('TicketreturnsController', () => {
  let controller: TicketreturnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketreturnsController],
      providers: [TicketreturnsService],
    }).compile();

    controller = module.get<TicketreturnsController>(TicketreturnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
