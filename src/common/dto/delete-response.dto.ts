import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class DeleteResponseDto {
  @ApiProperty()
  @Expose()
  affected: number

  @ApiProperty()
  @Expose()
  success: boolean

  @ApiProperty()
  @Expose()
  message: string

  constructor(success: boolean, message: string, affected: number) {
    this.success = success
    this.message = message
    this.affected = affected
  }
}
