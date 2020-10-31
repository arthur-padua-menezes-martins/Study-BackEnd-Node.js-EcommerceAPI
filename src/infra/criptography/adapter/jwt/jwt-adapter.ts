import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements IEncrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secret)

    return await Promise.resolve(token)
  }
}
