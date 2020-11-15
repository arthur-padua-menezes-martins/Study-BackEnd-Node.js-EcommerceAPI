import jwt from 'jsonwebtoken'
import {
  IEncrypter,
  IDecrypter
} from './jwt-adapter-protocols'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const token: string = jwt.sign({ id: value }, this.secret)

    return token
  }

  async decrypt (encrypted: string): Promise<string> {
    const decrypted: any = await jwt.verify(encrypted, this.secret)

    if (decrypted !== encrypted) {
      return typeof decrypted === 'string' ? decrypted : decrypted.iat
    } else {
      return ''
    }
  }
}
