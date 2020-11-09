import {
  IHasher,
  IHashComparer,
  accountModelDisabled
} from './make-hasher-cryptography-components'

export const makeHasherCryptography = async (): Promise<IHasher & IHashComparer> => {
  class HasherCryptographyStub implements IHasher, IHashComparer {
    async hash (value: string): Promise<string> {
      return accountModelDisabled.personal.password
    }

    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HasherCryptographyStub()
}
