import { UserModule } from 'src/user'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthEntity } from './entities'
import { JwtConstants } from './private'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './guards'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    JwtModule.register({
      global: true,
      privateKey: JwtConstants.PRIVATE_KEY,
      publicKey: JwtConstants.PUBLIC_KEY,
      signOptions: { expiresIn: '1d', algorithm: 'RS256' },
      verifyOptions: { algorithms: ['RS256'] }
    })
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {}
