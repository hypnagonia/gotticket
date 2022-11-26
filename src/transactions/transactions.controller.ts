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
  Header
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, CreateTransactionBatchDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  /*
  {
"ticket": 1,
"emails": ["hypnagonia@gmail.com"]
}
  */

  @Post('batch')
  createManyAndEmail(@Body() createDto: CreateTransactionBatchDto) {
    return this.transactionsService.createManyAndEmail(createDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Header('Content-Type', 'image/svg+xml')
  @Get('image/:id')
  async findOneImage(@Param('id') id: string, @Res() response: Response) {
    const qr = await this.transactionsService.findOneImage(id);
    qr.pipe(response)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('got')
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
