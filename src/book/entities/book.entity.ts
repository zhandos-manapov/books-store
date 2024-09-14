import { AbstractEntity } from 'src/common'
import { Column, Entity } from 'typeorm'

@Entity()
export class BookEntity extends AbstractEntity {
  @Column()
  name: string

  @Column()
  author: string

  @Column()
  dateOfPublish: Date
}
