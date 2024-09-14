import * as fs from 'fs'
import * as path from 'path'

export const JwtConstants = {
  PRIVATE_KEY: fs.readFileSync(path.resolve(__dirname, './../keys/id_rsa_priv.pem'), 'utf-8'),
  PUBLIC_KEY: fs.readFileSync(path.resolve(__dirname, './../keys/id_rsa_pub.pem'), 'utf-8')
}
