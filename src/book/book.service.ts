import { EntityNotFoundError, Repository } from 'typeorm'

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateBookDto } from './dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { BookEntity } from './entities'

@Injectable()
export class BookService {
  constructor(@InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>) {}

  async create(createBookDto: CreateBookDto) {
    const bookEntity = this.bookRepository.create(createBookDto)
    return await this.bookRepository.save(bookEntity)
  }

  async findAll() {
    return await this.bookRepository.find()
  }

  async findOne(id: string) {
    try {
      return await this.bookRepository.findOneByOrFail({ id })
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFoundException(error.message)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id)
    const bookEntity = await this.bookRepository.create(updateBookDto)
    return await this.bookRepository.save(bookEntity)
  }

  async remove(id: string) {
    const result = await this.bookRepository.delete({ id })
    if (result.affected === 0) throw new NotFoundException(`Book with id ${id} not found`)
    return result
  }
}
