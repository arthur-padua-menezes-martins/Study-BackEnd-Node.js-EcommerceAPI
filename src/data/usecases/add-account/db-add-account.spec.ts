import { DatabaseAddAccount } from './db-add-account'
import { httpRequestBodyMatchComplete } from '../../../presentation/helpers/export-all'

describe('DatabaseAddAccount Usecases', () => {
  test('<Should call Encrypter with correct password <version: 0.0.1>', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await Promise.resolve('encrypted_password')
      }
    }

    const encrypterStub = new EncrypterStub()
    const spyOnEncrypter = jest.spyOn(encrypterStub, 'encrypt')
    const systemUnderTest = new DatabaseAddAccount(encrypterStub)
    await systemUnderTest.add(httpRequestBodyMatchComplete)

    expect(spyOnEncrypter).toHaveBeenCalledWith(httpRequestBodyMatchComplete.password)
  })
})
