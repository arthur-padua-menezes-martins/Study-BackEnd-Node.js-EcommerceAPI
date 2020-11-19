import {
  IEncrypter
} from './mock-encrypter-cryptography-components'

export const mockEncrypterCryptography = async (): Promise<IEncrypter> => {
  class EncrypterCryptographyStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_encrypted_string'
    }
  }

  return new EncrypterCryptographyStub()
}
