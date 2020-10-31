import bcrypt from 'bcrypt'
import { IHasher } from '../../data/protocols/cryptography/hasher'

/**
* @implements {IHasher}
*
* @method ``hash``
* encrypts specific content for each implementation
*/
export class BcryptAdapter implements IHasher {
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
  async hash (value: string): Promise<string> {
    return await Promise.resolve(
      await bcrypt.hash(value, this.salt)
    )
  }
}
