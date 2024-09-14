import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string

  @ApiProperty({ format: 'password', minLength: 8, example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string
}
