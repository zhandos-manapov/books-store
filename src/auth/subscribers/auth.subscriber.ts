import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import { AuthEntity } from '../entities'
import { AuthProvider } from '../providers'

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<AuthEntity> {
  listenTo() {
    return AuthEntity
  }

  beforeInsert({ entity }: InsertEvent<AuthEntity>) {
    if (entity.password) {
      const { hash, salt } = AuthProvider.generateHashAndSalt(entity.password)
      entity.password = hash
      entity.salt = salt
    }

    if (entity.emailAddress) {
      entity.emailAddress = entity.emailAddress.toLowerCase()
    }
  }

  beforeUpdate({ entity, databaseEntity }: UpdateEvent<AuthEntity>): Promise<any> | void {
    if (!AuthProvider.validPassword(entity.password, databaseEntity.password, databaseEntity.salt)) {
      entity.password = AuthProvider.generateHashFromSalt(entity.password, databaseEntity.salt)
    }
  }
}
