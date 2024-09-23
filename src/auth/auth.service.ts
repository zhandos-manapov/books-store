import { PostgresError } from 'pg-error-enum'
import { UserService } from 'src/user'
import { UserEntity } from 'src/user/entities'
import { DataSource, EntityNotFoundError, QueryRunner, Repository } from 'typeorm'

import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'

import { AuthDto, RegistrationDto } from './dto'
import { AuthEntity } from './entities'
import { UserAlreadyExistException } from './exceptions'
import { AuthProvider } from './providers'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService
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

      throw new InternalServerErrorException(error)
    } finally {
      await queryRunner.release()
    }
    return userEntity
  }

  private async createAuth(createAuthDto: AuthDto, queryRunner: QueryRunner) {
    const authEntity = this.authRepository.create(createAuthDto)
    return await queryRunner.manager.save(authEntity)
  }

  async login(authDto: AuthDto) {
    let authEntity: AuthEntity
    try {
      authEntity = await this.authRepository.findOneByOrFail({ emailAddress: authDto.emailAddress })
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFoundException(error.message)
      throw new InternalServerErrorException(error)
    }
    const validPassword = AuthProvider.validPassword(authDto.password, authEntity.password, authEntity.salt)
    if (!validPassword) throw new UnauthorizedException()

    const payload = { sub: authEntity.id, email: authEntity.emailAddress }
    return { access_token: await this.jwtService.signAsync(payload) }
  }
}
