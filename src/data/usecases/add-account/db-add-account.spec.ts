import { DatabaseAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'
import { httpRequestBodyMatchComplete } from '../../../presentation/helpers/export-all'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddAccount
  encrypterStub: Encrypter
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('encrypted_password')
    }
  }
  const encrypterStub = new EncrypterStub()
  const systemUnderTest = new DatabaseAddAccount(encrypterStub)

  return {
    systemUnderTest,
    encrypterStub
  }
}

describe('DatabaseAddAccount Usecases', () => {
  test('<Should call Encrypter with correct password <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    const spyOnEncrypter = jest.spyOn(encrypterStub, 'encrypt')
    await systemUnderTest.add(httpRequestBodyMatchComplete)

    expect(spyOnEncrypter).toHaveBeenCalledWith(httpRequestBodyMatchComplete.password)
  })
})
