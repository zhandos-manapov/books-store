import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class BookResponse {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  readonly id: string

  @ApiProperty()
  @Expose()
  readonly name: string

  @ApiProperty()
  @Expose()
  readonly author: string

  @ApiProperty({ format: 'date' })
  @Expose()
  readonly dateOfPublish: Date
}
