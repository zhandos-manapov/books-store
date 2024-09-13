import { AbstractEntity } from 'src/common'
import { Column, Entity } from 'typeorm'

@Entity()
export class AuthEntity extends AbstractEntity {
  @Column({ unique: true })
  emailAddress: string

  @Column()
  password: string

  @Column()
  salt: string
}
