import { DatabaseAuthenticationController } from './db-authentication'
import {
  LoadAccountByEmailRepository, IAuthenticationModel,
  IAccountModel
} from './db-authentication-protocols'
import { signInHttpRequestBodyMatchComplete, accountModelMatch } from './db-authentication-utils'

const makeLoadAccountByEmailRepository = async (): Promise<LoadAccountByEmailRepository> => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<IAccountModel> {
      const account: IAccountModel = accountModelMatch
      return await Promise.resolve(account)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAuthenticationController
  loadAccountByEmailRepositoryStub: any
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const loadAccountByEmailRepositoryStub = await makeLoadAccountByEmailRepository()
  const systemUnderTest = new DatabaseAuthenticationController(loadAccountByEmailRepositoryStub)

  return {
    systemUnderTest,
    loadAccountByEmailRepositoryStub
  }
}

const authentication: IAuthenticationModel = signInHttpRequestBodyMatchComplete

describe('DatabaseAuthenticationController Usecases', () => {
  test('should call LoadAccountByEmailRepository with correct email <version: 0.0.1>', async () => {
    const { systemUnderTest, loadAccountByEmailRepositoryStub } = await makeSystemUnderTest()
    const spyOnLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await systemUnderTest.auth(authentication)
    expect(spyOnLoad).toHaveBeenCalledWith(authentication.email)
  })
})
