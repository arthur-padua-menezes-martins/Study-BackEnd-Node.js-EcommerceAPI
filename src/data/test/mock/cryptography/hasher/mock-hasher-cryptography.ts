import {
  IHasher,
  IHashComparer,
  informationsOfAccountModel
} from './mock-hasher-cryptography-components'

export const mockHasherCryptography = async (): Promise<IHasher & IHashComparer> => {
  class HasherCryptographyStub implements IHasher, IHashComparer {
    async hash (value: string): Promise<string> {
      return informationsOfAccountModel.disabled.personal.password
    }

    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HasherCryptographyStub()
}
