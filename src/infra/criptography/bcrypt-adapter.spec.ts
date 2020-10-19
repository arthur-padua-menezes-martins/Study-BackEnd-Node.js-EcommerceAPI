import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { httpRequestBodyMatchComplete } from '../../presentation/helpers/httpRequestData'

interface ISystemUnderTestTypes {
  systemUnderTest: BcryptAdapter
}
const salt = 12
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
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
    const { systemUnderTest } = await makeSystemUnderTest()
    const spyOnBcryptHash = jest.spyOn(bcrypt, 'hash')
    await systemUnderTest.encrypt(httpRequestBodyMatchComplete.password)

    expect(spyOnBcryptHash).toHaveBeenLastCalledWith(httpRequestBodyMatchComplete.password, salt)
  })

  test('Should return a encryptedPassword on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const encryptedPassword = await systemUnderTest.encrypt(httpRequestBodyMatchComplete.password)

    expect(encryptedPassword).toBe('encrypted_password')
  })

  test('Should throw if bcrypt throws <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.reject(await new Error()))
    const encryptedPassword = systemUnderTest.encrypt(httpRequestBodyMatchComplete.password)

    await expect(encryptedPassword).rejects.toThrow()
  })
})
