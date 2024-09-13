import { UserModule } from 'src/user'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
