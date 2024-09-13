import { plainToInstance } from 'class-transformer'
import { PostgresError } from 'pg-error-enum'
import { UserService } from 'src/user'
import { UserEntity } from 'src/user/entities'
import { DataSource, QueryRunner, Repository } from 'typeorm'

import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { CreateAuthDto, RegistrationDto, RegistrationResponseDto } from './dto'
import { AuthEntity } from './entities'
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>
  ) {}

  async register(registrationDto: RegistrationDto) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    let userEntity: UserEntity
    try {
      const authEntity = await this.createAuth(registrationDto, queryRunner)

      userEntity = await this.userService.create(registrationDto, authEntity, queryRunner)

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()

      if (error.code === PostgresError.UNIQUE_VIOLATION) {
        throw new UserAlreadyExistException()
      }

      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }

    return plainToInstance(RegistrationResponseDto, userEntity, { excludeExtraneousValues: true })
  }

  private async createAuth(createAuthDto: CreateAuthDto, queryRunner: QueryRunner) {
    const authEntity = this.authRepository.create(createAuthDto)
    return await queryRunner.manager.save(authEntity)
  }
}
