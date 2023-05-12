import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dtos';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const book = await this.booksService.getById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  @Post('/')
  create(@Body() bookData: CreateBookDTO) {
    return this.booksService.create(bookData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Order not found');

    await this.booksService.updateById(id, bookData);
    return { message: `Book with id ${id} has been updated` };
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Books not found');
    await this.booksService.deleteById(id);
    return { message: `Order with id ${id} has been deleted` };
  }
}
