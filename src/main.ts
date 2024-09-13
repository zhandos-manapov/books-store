import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { EnvironmentVariables } from './constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Books Store API')
    .setDescription('This is the API docs for Books Store')
    .setVersion('1.0')
    .addTag('Books')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const configService = app.get(ConfigService<EnvironmentVariables>)
  const PORT = configService.get<number>('PORT')

  await app.listen(PORT)
}
bootstrap()
