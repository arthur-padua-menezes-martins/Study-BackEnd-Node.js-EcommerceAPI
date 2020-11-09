import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { signUpHttpRequestBodyMatch, fakeDataSignInHttpRequestBodyMatch } from '../../../../utils/fake/data/export-all'

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
    return await Promise.resolve('hashed_value')
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const anyHash: string = 'any_hash'

describe('BcryptAdapter', () => {
  test('Should call hash whit correct values <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const spyOnHash = jest.spyOn(bcrypt, 'hash')

    await systemUnderTest.hash(signUpHttpRequestBodyMatch.personal.password)
    expect(spyOnHash).toHaveBeenLastCalledWith(signUpHttpRequestBodyMatch.personal.password, salt)
  })

  test('Should return a hashedPassword on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const hash = await systemUnderTest.hash(signUpHttpRequestBodyMatch.personal.password)
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if hash throws <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.reject(await new Error()))

    const hash = systemUnderTest.hash(signUpHttpRequestBodyMatch.personal.password)
    await expect(hash).rejects.toThrow()
  })

  test('Should call compare whit correct values <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const spyOnCompare = jest.spyOn(bcrypt, 'compare')

    await systemUnderTest.compare(fakeDataSignInHttpRequestBodyMatch.password, anyHash)
    expect(spyOnCompare).toHaveBeenLastCalledWith(fakeDataSignInHttpRequestBodyMatch.password, anyHash)
  })

  test('Should return true if compare success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const isEqual = await systemUnderTest.compare(fakeDataSignInHttpRequestBodyMatch.password, anyHash)
    expect(isEqual).toBe(true)
  })

  test('Should return false if compare falils <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const isEqual = await systemUnderTest.compare(fakeDataSignInHttpRequestBodyMatch.password, anyHash)
    expect(isEqual).toBe(false)
  })

  test('Should throw if compare throws <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    jest.spyOn(bcrypt, 'compare').mockReturnValue(Promise.reject(await new Error()))

    const isEqual = systemUnderTest.compare(signUpHttpRequestBodyMatch.personal.password, anyHash)
    await expect(isEqual).rejects.toThrow()
  })
})
