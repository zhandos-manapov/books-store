import { EnvironmentVariables, NODE_ENV } from 'src/constants'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthSubscriber } from 'src/auth'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host: 'postgres_db',
        // configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        logging: configService.get<string>('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        subscribers: [AuthSubscriber]
      })
    })
  ]
})
export class DatabaseModule {}
