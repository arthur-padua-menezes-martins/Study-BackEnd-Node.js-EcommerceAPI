import bcrypt from 'bcrypt'
import { IHasher, IHashComparer } from '../../../../data/protocols/cryptography/export-all'

/**
* @implements {IHasher}
*
* @method ``hash``
* encrypts specific content for each implementation
*/
export class BcryptAdapter implements IHasher, IHashComparer {
  /**
  * @param salt
  * number of randomizations
  */
  constructor (
    private readonly salt: number
  ) {}

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

  async compare (value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash)

    return await Promise.resolve(isEqual)
  }
}
