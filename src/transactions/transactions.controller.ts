import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Header,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  CreateTransactionBatchDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard([Role.COMPANY])) or api
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  /*
  {
"ticket": 1,
"emails": ["hgonia@gmail.com"]
}
  */

  @UseGuards(JwtAuthGuard, RolesGuard([Role.COMPANY]))
  @Post('batch')
  createManyAndEmail(@Body() createDto: CreateTransactionBatchDto) {
    return this.transactionsService.createManyAndEmail(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard([Role.SCANNER]))
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('ticket/:tickedId')
  findAllyTickedID(@Param('tickedId') id: string) {
    return this.transactionsService.findAllByTickedID(+id);
  }

  @Header('Content-Type', 'image/svg+xml')
  @Get('image/:id')
  async findOneImage(@Param('id') id: string, @Res() response: Response) {
    const qr = await this.transactionsService.findOneImage(id);
    qr.pipe(response);
  }

  @Header('Content-Type', 'image/png+xml')
  @Get('image/:id/png')
  async findOneImagePNG(@Param('id') id: string, @Res() response: Response) {
    const qr = await this.transactionsService.findOneImagePNG(id);
    qr.pipe(response);
  }

  // todo not id but number
  // @UseGuards(JwtAuthGuard, RolesGuard([Role.ADMIN]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard([Role.ADMIN]))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard([Role.SCANNER]))
  @Patch(':id/use')
  useTicket(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.useTicket(+id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard([Role.ADMIN]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.transactionsService.remove(+id);
  }
}
