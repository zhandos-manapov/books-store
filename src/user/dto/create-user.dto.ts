import { IsNotEmpty, IsString } from 'class-validator'
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto'

import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto extends CreateAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string
}
