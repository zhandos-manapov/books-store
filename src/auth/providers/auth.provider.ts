import * as crypto from 'crypto'

export class AuthProvider {
  static generateHashAndSalt(password: string) {
    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return { salt, hash }
  }

  static generateHashFromSalt(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  }

  static validPassword(password: string, dbPassword: string, dbSalt: string) {
    const hashVerify = this.generateHashFromSalt(password, dbSalt)
    return dbPassword === hashVerify
  }
}
