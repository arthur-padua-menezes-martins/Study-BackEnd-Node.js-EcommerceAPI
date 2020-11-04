import { DatabaseAccountAuthenticationController } from './db-account-authentication'
import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldModel,
  IAuthenticationModel,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository,
  IAccountModel
} from './db-account-authentication-protocols'
import { signInHttpRequestBodyMatchComplete, accountModelDisabled, accountModelEnabled } from './db-account-authentication-utils'

const makeSearchAccountByEmailRepository = async (): Promise<ISearchAccountByFieldRepository> => {
  class SearchAccountByFieldRepositoryStub implements ISearchAccountByFieldRepository {
    async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel> {
      const account: IAccountModel = accountModelEnabled
      return await Promise.resolve(account)
    }
  }

  return new SearchAccountByFieldRepositoryStub()
}

const makeHashComparer = async (): Promise<IHashComparer> => {
  class HashComparerStub implements IHashComparer {
    async compare (password: string, passwordHash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new HashComparerStub()
}

const accessToken = 'any_token'
const makeEncrypterGenerator = async (): Promise<IEncrypter> => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve(accessToken)
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = async (): Promise<IUpdateAccessTokenRepository> => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {

    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAccountAuthenticationController
  SearchAccountByEmailRepositoryStub: ISearchAccountByFieldRepository
  hashComparerStub: IHashComparer
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const SearchAccountByEmailRepositoryStub = await makeSearchAccountByEmailRepository()
  const hashComparerStub = await makeHashComparer()
  const encrypterStub = await makeEncrypterGenerator()
  const updateAccessTokenRepositoryStub = await makeUpdateAccessTokenRepository()
  const systemUnderTest = new DatabaseAccountAuthenticationController(
    SearchAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub
  )

  return {
    systemUnderTest,
    SearchAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

const authentication: IAuthenticationModel = signInHttpRequestBodyMatchComplete

describe('DatabaseAuthenticationController Usecases', () => {
  test('should call SearchAccountByEmailRepository with correct email <version: 0.0.1>', async () => {
    const { systemUnderTest, SearchAccountByEmailRepositoryStub } = await makeSystemUnderTest()
    const spyOnSearchByEmail = jest.spyOn(SearchAccountByEmailRepositoryStub, 'searchByField')

    await systemUnderTest.auth(authentication)
    expect(spyOnSearchByEmail).toHaveBeenCalledWith({ email: authentication.email })
  })

  test('should throw if SearchAccountByEmailRepository throws <version: 0.0.1>', async () => {
    const { systemUnderTest, SearchAccountByEmailRepositoryStub } = await makeSystemUnderTest()
    jest.spyOn(SearchAccountByEmailRepositoryStub, 'searchByField').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })

  test('should return an null if SearchAccountByEmailRepository returns null <version: 0.0.1>', async () => {
    const { systemUnderTest, SearchAccountByEmailRepositoryStub } = await makeSystemUnderTest()
    jest.spyOn(SearchAccountByEmailRepositoryStub, 'searchByField').mockReturnValueOnce(Promise.resolve(null))

    const authorization = await systemUnderTest.auth(authentication)
    expect(authorization).toBe(null)
  })

  test('should call HashComparer with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, hashComparerStub } = await makeSystemUnderTest()
    const spyOnCompare = jest.spyOn(hashComparerStub, 'compare')

    await systemUnderTest.auth(authentication)
    expect(spyOnCompare).toHaveBeenCalledWith(authentication.password, accountModelEnabled.password)
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
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })

  test('must return the authentication token if Encrypter succeeds <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const authorization = await systemUnderTest.auth(authentication)
    expect(authorization).toBe(accessToken)
  })

  test('should call UpdateAccessTokenRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, updateAccessTokenRepositoryStub } = await makeSystemUnderTest()
    const spyOnUpdate = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')

    await systemUnderTest.auth(authentication)
    expect(spyOnUpdate).toHaveBeenCalledWith(accountModelEnabled.id, accessToken)
  })

  test('should return an Error if UpdateAccessTokenRepository returns Error <version: 0.0.1>', async () => {
    const { systemUnderTest, updateAccessTokenRepositoryStub } = await makeSystemUnderTest()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(Promise.reject(new Error()))

    const authorization = systemUnderTest.auth(authentication)
    await expect(authorization).rejects.toThrow()
  })
})
