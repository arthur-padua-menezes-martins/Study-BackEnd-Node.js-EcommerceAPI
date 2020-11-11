import jwt from 'jsonwebtoken'
import {
  JwtAdapter
} from './jwt-adapter'
import {
  accountModelEnabled
} from '../../../../utils/fake/informations-of/account/model/fake-data-account-model'

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

    await systemUnderTest.encrypt(accountModelEnabled.id)
    expect(sypOnSign).toHaveBeenCalledWith({ id: accountModelEnabled.id }, secret)
  })

  test('Should call sign with correct values <version: 0.0.1>', async () => {
    const systemUnderTest = await makeSystemUnderTest()

    const accessToken = await systemUnderTest.encrypt(accountModelEnabled.id)
    expect(accessToken).toBe(anyToken)
  })

  test('Should throw if sign thows <version: 0.0.1>', async () => {
    const systemUnderTest = await makeSystemUnderTest()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = systemUnderTest.encrypt(accountModelEnabled.id)
    await expect(promise).rejects.toThrow()
  })
})
