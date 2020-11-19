import {
  IEncrypter
} from './make-encrypter-cryptography-components'

export const makeEncrypterCryptography = async (): Promise<IEncrypter> => {
  class EncrypterCryptographyStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_encrypted_string'
    }
  }

  return new EncrypterCryptographyStub()
}
