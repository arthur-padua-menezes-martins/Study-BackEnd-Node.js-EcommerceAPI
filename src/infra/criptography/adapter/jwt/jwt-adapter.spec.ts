import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'
import { accountModelMatch } from '../../../../utils/fake/data/account/fake-data-account-model'

const secret = 'any_secret'
const anyToken = 'any_token'

const makeSystemUnderTest = async (): Promise<JwtAdapter> => {
  return new JwtAdapter(secret)
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve(anyToken)
  }
}))

describe('JwtAdapter', () => {
  test('Should call sign with correct values <version: 0.0.1>', async () => {
    const systemUnderTest = await makeSystemUnderTest()
    const sypOnSign = jest.spyOn(jwt, 'sign')

    await systemUnderTest.encrypt(accountModelMatch.id)
    expect(sypOnSign).toHaveBeenCalledWith({ id: accountModelMatch.id }, secret)
  })

  test('Should call sign with correct values <version: 0.0.1>', async () => {
    const systemUnderTest = await makeSystemUnderTest()

    const accessToken = await systemUnderTest.encrypt(accountModelMatch.id)
    expect(accessToken).toBe(anyToken)
  })

  test('Should throw if sign thows <version: 0.0.1>', async () => {
    const systemUnderTest = await makeSystemUnderTest()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = systemUnderTest.encrypt(accountModelMatch.id)
    await expect(promise).rejects.toThrow()
  })
})
