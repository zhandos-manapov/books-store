import { plainToInstance } from 'class-transformer'
import { DeleteResponseDto } from 'src/common'

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { BookService } from './book.service'
import { BookResponse, CreateBookDto, UpdateBookDto } from './dto'

@ApiBearerAuth()
@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiResponse({ type: BookResponse })
  async create(@Body() createBookDto: CreateBookDto) {
    const bookEntity = await this.bookService.create(createBookDto)
    return plainToInstance(BookResponse, bookEntity, { excludeExtraneousValues: true })
  }

  @Get()
  @ApiResponse({ type: [BookResponse] })
  async findAll() {
    const bookEntities = await this.bookService.findAll()
    return plainToInstance(BookResponse, bookEntities, { excludeExtraneousValues: true })
  }

  @Get(':id')
  @ApiResponse({ type: BookResponse })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const bookEntity = await this.bookService.findOne(id)
    return plainToInstance(BookResponse, bookEntity, { excludeExtraneousValues: true })
  }

  @Put(':id')
  @ApiResponse({ type: BookResponse })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    const bookEntity = this.bookService.update(id, updateBookDto)
    return plainToInstance(BookResponse, bookEntity, { excludeExtraneousValues: true })
  }

  @Delete(':id')
  @ApiResponse({ type: DeleteResponseDto })
  async remove(@Param('id') id: string) {
    const result = await this.bookService.remove(id)
    const affectedRows = result.affected || 0

    return new DeleteResponseDto(affectedRows > 0, `Course category with ID ${id} deleted successfully`, affectedRows)
  }
}
