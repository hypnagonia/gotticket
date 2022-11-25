import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketreturnDto } from './create-ticketreturn.dto';

export class UpdateTicketreturnDto extends PartialType(CreateTicketreturnDto) {}
