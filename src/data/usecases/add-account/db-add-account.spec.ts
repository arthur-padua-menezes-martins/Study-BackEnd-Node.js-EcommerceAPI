import { DatabaseAddAccountController } from './db-add-account'
import {
  IAccountModel, IAddAccountModel,
  IHasher, IAddAccountRepository
} from './db-add-account-protocols'
import { signUpHttpRequestBodyMatchComplete, accountModelMatch } from './db-add-account-utils'

const makeHasher = async (): Promise<IHasher> => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('encrypted_password')
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = async (): Promise<IAddAccountRepository> => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      const acconunt: IAccountModel = accountModelMatch
      return await Promise.resolve(acconunt)
    }
  }
  return new AddAccountRepositoryStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddAccountController
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const hasherStub = await makeHasher()
  const addAccountRepositoryStub = await makeAddAccountRepository()
  const systemUnderTest = new DatabaseAddAccountController(hasherStub, addAccountRepositoryStub)

  return {
    systemUnderTest,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DatabaseAddAccountController Usecases', () => {
  test('Should call Encrypter with correct password <version: 0.0.1>', async () => {
    const { systemUnderTest, hasherStub } = await makeSystemUnderTest()
    const spyOnEncrypterEncrypt = jest.spyOn(hasherStub, 'hash')
    await systemUnderTest.add(signUpHttpRequestBodyMatchComplete)

    expect(spyOnEncrypterEncrypt).toHaveBeenCalledWith(signUpHttpRequestBodyMatchComplete.password)
  })

  test('Should throw if Encrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, hasherStub } = await makeSystemUnderTest()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promiseNewAccount = systemUnderTest.add(signUpHttpRequestBodyMatchComplete)

    await expect(promiseNewAccount).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, addAccountRepositoryStub } = await makeSystemUnderTest()
    const spyOnAddAccountRepositoryStubAdd = jest.spyOn(addAccountRepositoryStub, 'add')
    await systemUnderTest.add(signUpHttpRequestBodyMatchComplete)

    expect(spyOnAddAccountRepositoryStubAdd).toHaveBeenCalledWith({
      ...signUpHttpRequestBodyMatchComplete,
      password: 'encrypted_password'
    })
  })

  test('Should return an account on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.add(signUpHttpRequestBodyMatchComplete)

    expect(account).toEqual({
      id: 'valid_id',
      ...signUpHttpRequestBodyMatchComplete,
      password: 'encrypted_password'
    })
  })
})
