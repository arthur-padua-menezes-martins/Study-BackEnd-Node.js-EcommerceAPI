import {
  IDecrypter
} from './make-decrypter-cryptography-components'

export const makeDecrypterCryptography = async (): Promise<IDecrypter> => {
  class DecrypterCryptographyStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_decrypted_string'
    }
  }

  return new DecrypterCryptographyStub()
}
