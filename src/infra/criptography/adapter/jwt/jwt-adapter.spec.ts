import jwt from 'jsonwebtoken'
import {
  JwtAdapter
} from './jwt-adapter'
import {
  informationsOfAccountModel
} from './jwt-adapter-utils'

const secret = 'any_secret'
const token = {
  any: 'any_token'
}

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
    return token.any
  },
  async verify (): Promise<string> {
    return token.any
  }
}))

describe('JwtAdapter', () => {
  describe('sign', () => {
    test('should call sign with correct values <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const sypOnSign = jest.spyOn(jwt, 'sign')
      await systemUnderTest.encrypt(informationsOfAccountModel.enabled.id)

      expect(sypOnSign).toHaveBeenCalledWith({ id: informationsOfAccountModel.enabled.id }, secret)
    })

    test('should call sign with correct values <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const accessToken = await systemUnderTest.encrypt(informationsOfAccountModel.enabled.id)

      expect(accessToken).toBe(token.any)
    })

    test('should throw if sign thows <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = systemUnderTest.encrypt(informationsOfAccountModel.enabled.id)

      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify', () => {
    test('should throw if verify thows <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const decryptedValue = systemUnderTest.decrypt(token.any)

      await expect(decryptedValue).rejects.toThrow()
    })

    test('should call verify with correct values <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const sypOnVerify = jest.spyOn(jwt, 'verify')
      await systemUnderTest.decrypt(token.any)

      expect(sypOnVerify).toHaveBeenCalledWith(token.any, secret)
    })

    test('should return a empty value on verify fails <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const decryptedValue = await systemUnderTest.decrypt(token.any)

      expect(decryptedValue).toBeFalsy()
    })
  })
})
