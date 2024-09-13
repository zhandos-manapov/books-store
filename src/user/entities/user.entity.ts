import { AuthEntity } from 'src/auth'
import { AbstractEntity } from 'src/common'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity()
export class UserEntity extends AbstractEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToOne(() => AuthEntity)
  @JoinColumn()
  auth: AuthEntity

  get emailAddress() {
    return this.auth.emailAddress
  }
}
