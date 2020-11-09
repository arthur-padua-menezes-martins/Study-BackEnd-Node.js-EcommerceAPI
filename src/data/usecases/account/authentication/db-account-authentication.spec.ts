import {
  DatabaseAccountAuthenticationController
} from './db-account-authentication'
import {
  makeReadAccount,
  makeHasherCryptography,
  makeEncrypterCryptography,
  makeUpdateAccount
} from './db-account-authentication-make'
import {
  ISearchAccountByFieldRepository,
  IAuthenticationModel,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository
} from './db-account-authentication-protocols'
import { fakeDataSignInHttpRequestBodyMatch, accountModelEnabled } from './db-account-authentication-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAccountAuthenticationController
  hashComparerStub: IHashComparer
  encrypterStub: IEncrypter
  readAccountStub: ISearchAccountByFieldRepository
  updateAccountStub: IUpdateAccessTokenRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const readAccountStub = await makeReadAccount()
  const hashComparerStub = await makeHasherCryptography()
  const encrypterStub = await makeEncrypterCryptography()
  const updateAccountStub = await makeUpdateAccount()

  const systemUnderTest = new DatabaseAccountAuthenticationController(
    readAccountStub, hashComparerStub, encrypterStub, updateAccountStub
  )

  return {
    systemUnderTest,
    readAccountStub,
    hashComparerStub,
    encrypterStub,
    updateAccountStub
  }
}

const authentication: IAuthenticationModel = fakeDataSignInHttpRequestBodyMatch
const accessToken: string = 'any_token'

describe('DatabaseAuthenticationController Usecases', () => {
  test('should throw if SearchAccountByFieldRepository throws <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()
    jest.spyOn(readAccountStub, 'searchByField').mockImplementationOnce(async () => {
      throw new Error()
    })

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })

  test('should return an null if SearchAccountByFieldRepository returns null <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()
    jest.spyOn(readAccountStub, 'searchByField').mockReturnValueOnce(Promise.resolve(null))

    const authorization = await systemUnderTest.auth({
      email: authentication.email,
      password: authentication.password
    })
    expect(authorization).toBe(null)
  })

  test('should call SearchAccountByFieldRepository with correct email <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()
    const spyOnSearchByField = jest.spyOn(readAccountStub, 'searchByField')

    await systemUnderTest.auth(authentication)
    expect(spyOnSearchByField).toHaveBeenCalledWith({
      id: '',
      email: authentication.email
    })
  })

  test('should call HashComparer with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, hashComparerStub } = await makeSystemUnderTest()
    const spyOnCompare = jest.spyOn(hashComparerStub, 'compare')

    await systemUnderTest.auth(authentication)
    expect(spyOnCompare).toHaveBeenCalledWith(authentication.password, accountModelEnabled.personal.password)
  })

  test('should throw if HashComparer throws <version: 0.0.1>', async () => {
    const { systemUnderTest, hashComparerStub } = await makeSystemUnderTest()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })

  test('should return an null if HashComparer fails <version: 0.0.1>', async () => {
    const { systemUnderTest, hashComparerStub } = await makeSystemUnderTest()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const authorization = await systemUnderTest.auth(authentication)
    expect(authorization).toBe(null)
  })

  test('should call Encrypter with correct id <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    const spyOnEncrypt = jest.spyOn(encrypterStub, 'encrypt')

    await systemUnderTest.auth(authentication)
    expect(spyOnEncrypt).toHaveBeenCalledWith(accountModelEnabled.id)
  })

  test('should return an null if Encrypter fails <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      throw new Error()
    })

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })

  test('must return the authentication token if Encrypter succeeds <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValue(Promise.resolve(accessToken))

    const authorization = await systemUnderTest.auth(authentication)
    expect(authorization).toBe(accessToken)
  })

  test('should call UpdateAccessTokenRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub, updateAccountStub } = await makeSystemUnderTest()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValue(Promise.resolve(accessToken))
    const spyOnUpdate = jest.spyOn(updateAccountStub, 'updateAccessToken')

    await systemUnderTest.auth(authentication)
    expect(spyOnUpdate).toHaveBeenCalledWith(accountModelEnabled.id, accessToken)
  })

  test('should return an error if UpdateAccessTokenRepository throws error <version: 0.0.1>', async () => {
    const { systemUnderTest, updateAccountStub } = await makeSystemUnderTest()
    jest.spyOn(updateAccountStub, 'updateAccessToken').mockImplementationOnce(async () => {
      throw new Error()
    })

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })
})
