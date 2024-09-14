import { IsNotEmpty, IsString } from 'class-validator'
import { AuthDto } from 'src/auth/dto/auth.dto'

import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto extends AuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string
}
