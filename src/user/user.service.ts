import { AuthEntity } from 'src/auth'
import { QueryRunner, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto'
import { UserEntity } from './entities'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(createUserDto: CreateUserDto, auth: AuthEntity, queryRunner: QueryRunner) {
    const userEntity = this.userRepository.create({
      ...createUserDto,
      auth
    })

    return await queryRunner.manager.save(userEntity)
  }
}
