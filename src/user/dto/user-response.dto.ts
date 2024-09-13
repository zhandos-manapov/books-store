import { Expose } from 'class-transformer'

import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  readonly id: string

  @ApiProperty()
  @Expose()
  readonly firstName: string

  @ApiProperty()
  @Expose()
  readonly lastName: string

  @ApiProperty()
  @Expose()
  readonly emailAddress: string
}
