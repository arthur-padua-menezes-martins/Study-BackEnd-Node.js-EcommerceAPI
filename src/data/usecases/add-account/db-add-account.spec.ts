import { DatabaseAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'
import { httpRequestBodyMatchComplete } from '../../../presentation/helpers/export-all'

const makeEncrypter = async (): Promise<any> => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('encrypted_password')
    }
  }
  return new EncrypterStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddAccount
  encrypterStub: Encrypter
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const encrypterStub = await makeEncrypter()
  const systemUnderTest = new DatabaseAddAccount(encrypterStub)

  return {
    systemUnderTest,
    encrypterStub
  }
}

describe('DatabaseAddAccount Usecases', () => {
  test('Should call Encrypter with correct password <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    const spyOnEncrypter = jest.spyOn(encrypterStub, 'encrypt')
    await systemUnderTest.add(httpRequestBodyMatchComplete)

    expect(spyOnEncrypter).toHaveBeenCalledWith(httpRequestBodyMatchComplete.password)
  })

  test('Should throw if Encrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promiseNewAccount = systemUnderTest.add(httpRequestBodyMatchComplete)

    await expect(promiseNewAccount).rejects.toThrow()
  })
})
