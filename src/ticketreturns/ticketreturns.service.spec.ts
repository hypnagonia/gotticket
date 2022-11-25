import { Test, TestingModule } from '@nestjs/testing';
import { TicketreturnsService } from './ticketreturns.service';

describe('TicketreturnsService', () => {
  let service: TicketreturnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketreturnsService],
    }).compile();

    service = module.get<TicketreturnsService>(TicketreturnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
