import bcrypt from 'bcrypt'
import { IEncrypter } from '../../data/protocols/encrypter'

/**
* @implements {IEncrypter}
*
* @method ``encrypt``
* encrypts specific content for each implementation
*/
export class BcryptAdapter implements IEncrypter {
  private readonly salt: number

  /**
  * @param salt
  * number of randomizations
  */
  constructor (salt: number) {
    this.salt = salt
  }

  /**
  * @param value
  * value to encrypt
  * @returns
  * encrypted value
  */
  async encrypt (value: string): Promise<string> {
    return await Promise.resolve(
      await bcrypt.hash(value, this.salt)
    )
  }
}
