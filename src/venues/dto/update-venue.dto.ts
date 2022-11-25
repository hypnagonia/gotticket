import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
  id: number;
  address: string;
  name: string;
  description: string;
  capacity: number;
}
