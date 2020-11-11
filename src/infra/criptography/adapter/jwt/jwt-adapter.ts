import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../../data/protocols/cryptography/encrypt/encrypter'

export class JwtAdapter implements IEncrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secret)

    return await Promise.resolve(token)
  }
}
