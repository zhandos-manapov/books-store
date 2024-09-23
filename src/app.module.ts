import * as Joi from 'joi'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth'
import { BookModule } from './book'
import { NODE_ENV } from './constants'
import { DatabaseModule } from './database'
import { UserModule } from './user'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required().valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required()
      })
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
