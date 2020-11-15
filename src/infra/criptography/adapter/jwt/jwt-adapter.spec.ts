import jwt from 'jsonwebtoken'
import {
  JwtAdapter
} from './jwt-adapter'
import {
  accountModelEnabled
} from '../../../../utils/fake/informations-of/account/model/fake-data-account-model'

const secret = 'any_secret'
const anyToken = 'any_token'
const decryptedString = 'decrypted_string'

interface ISystemUnderTestTypes {
  systemUnderTest: JwtAdapter
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new JwtAdapter(secret)

  return {
    systemUnderTest
  }
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return anyToken
  },
  async verify (): Promise<string> {
    return anyToken
  }
}))

describe('JwtAdapter', () => {
  describe('sign', () => {
    test('should call sign with correct values <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()
      const sypOnSign = jest.spyOn(jwt, 'sign')

      await systemUnderTest.encrypt(accountModelEnabled.id)
      expect(sypOnSign).toHaveBeenCalledWith({ id: accountModelEnabled.id }, secret)
    })

    test('should call sign with correct values <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const accessToken = await systemUnderTest.encrypt(accountModelEnabled.id)
      expect(accessToken).toBe(anyToken)
    })

    test('should throw if sign thows <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = systemUnderTest.encrypt(accountModelEnabled.id)
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify', () => {
    test('should throw if verify thows <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })

      const decryptedValue = systemUnderTest.decrypt(anyToken)
      await expect(decryptedValue).rejects.toThrow()
    })

    test('should call verify with correct values <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const sypOnVerify = jest.spyOn(jwt, 'verify')
      await systemUnderTest.decrypt(anyToken)

      expect(sypOnVerify).toHaveBeenCalledWith(anyToken, secret)
    })

    test('should return a value on verify success <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const decryptedValue = await systemUnderTest.decrypt(anyToken)
      expect(decryptedValue).toBe(decryptedString)
    })
  })
})
