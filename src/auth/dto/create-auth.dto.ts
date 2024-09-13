import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateAuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string
}
