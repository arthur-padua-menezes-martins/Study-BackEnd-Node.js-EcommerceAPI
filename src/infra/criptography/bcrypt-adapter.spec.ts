import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { httpRequestBodyMatchComplete } from '../../presentation/helpers/httpRequestData'

interface ISystemUnderTestTypes {
  systemUnderTest: BcryptAdapter
}
const makeSystemUnderTest = async (salt: number): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new BcryptAdapter(salt)

  return {
    systemUnderTest
  }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('encrypted_password')
  }
}))

describe('BcryptAdapter', () => {
  test('Should call bcrypt whit correct values <version: 0.0.1>', async () => {
    const salt = 12
    const { systemUnderTest } = await makeSystemUnderTest(salt)
    const spyOnBcryptHash = jest.spyOn(bcrypt, 'hash')
    await systemUnderTest.encrypt(httpRequestBodyMatchComplete.password)

    expect(spyOnBcryptHash).toHaveBeenLastCalledWith(httpRequestBodyMatchComplete.password, salt)
  })

  test('Should return a encryptedPassword on success <version: 0.0.1>', async () => {
    const salt = 12
    const { systemUnderTest } = await makeSystemUnderTest(salt)
    const encryptedPassword = await systemUnderTest.encrypt(httpRequestBodyMatchComplete.password)

    expect(encryptedPassword).toBe('encrypted_password')
  })
})
