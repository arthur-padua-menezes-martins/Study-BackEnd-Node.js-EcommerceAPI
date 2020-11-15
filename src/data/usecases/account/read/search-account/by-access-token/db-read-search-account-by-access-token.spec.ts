import {
  DatabaseSearchAccountByAccessToken
} from './db-read-search-account-by-access-token'
import {
  IDecrypter,
  ISearchAccountByTokenRepository
} from './db-read-search-account-by-access-token-protocols'
import {
  makeDecrypterCryptography,
  makeReadAccount
} from './db-read-search-account-by-access-token-make'
import {
  informationsOfAccessTokenHttpRequestHeaders
} from './db-read-search-account-by-access-token-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseSearchAccountByAccessToken
  decrypterStub: IDecrypter
  readAccountStub: ISearchAccountByTokenRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const decrypterStub = await makeDecrypterCryptography()
  const readAccountStub = await makeReadAccount()
  const systemUnderTest = new DatabaseSearchAccountByAccessToken(decrypterStub, readAccountStub)

  return {
    systemUnderTest,
    decrypterStub,
    readAccountStub
  }
}

const accessToken = informationsOfAccessTokenHttpRequestHeaders['x-access-token']
const anyRole = 'any_role'
const decryptedToken = 'any_decrypted_string'

describe('DatabaseSearchAccountByAccessToken', () => {
  test('should throw if decrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, decrypterStub } = await makeSystemUnderTest()

    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const account = systemUnderTest.searchByToken(accessToken)

    await expect(account).rejects.toThrow()
  })

  test('should return null if decrypter return null <version: 0.0.1>', async () => {
    const { systemUnderTest, decrypterStub } = await makeSystemUnderTest()

    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await systemUnderTest.searchByToken(accessToken)

    expect(account).toBeNull()
  })

  test('should call decrypter with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, decrypterStub } = await makeSystemUnderTest()

    const spyOnDecrypt = jest.spyOn(decrypterStub, 'decrypt')
    await systemUnderTest.searchByToken(accessToken, anyRole)

    expect(spyOnDecrypt).toHaveBeenCalledWith(accessToken)
  })

  test('should call searchByToken with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()

    const spyOnSearchByToken = jest.spyOn(readAccountStub, 'searchByToken')
    await systemUnderTest.searchByToken(accessToken)

    expect(spyOnSearchByToken).toHaveBeenCalledWith(decryptedToken)
  })

  test('should return null if searchByToken return null <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()

    jest.spyOn(readAccountStub, 'searchByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await systemUnderTest.searchByToken(accessToken)

    expect(account).toBeNull()
  })

  test('should return an account if searchByToken match account with accessToken <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const account = await systemUnderTest.searchByToken(accessToken)

    expect(account).toBeTruthy()
  })
})
