import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly author: string

  @ApiProperty({ format: 'date' })
  @IsString()
  @IsNotEmpty()
  readonly dateOfPublish: Date
}
