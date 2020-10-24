import { DatabaseAddAccount } from './db-add-account'
import {
  IAccountModel, IAddAccountModel,
  IEncrypter, IAddAccountRepository,
  signUpHttpRequestBodyMatchComplete
} from './db-add-account-protocols'

const makeEncrypter = async (): Promise<IEncrypter> => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('encrypted_password')
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = async (): Promise<IAddAccountRepository> => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        ...signUpHttpRequestBodyMatchComplete,
        password: 'encrypted_password'
      }
      return await Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddAccount
  encrypterStub: IEncrypter
  addAccountRepositoryStub: IAddAccountRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const encrypterStub = await makeEncrypter()
  const addAccountRepositoryStub = await makeAddAccountRepository()
  const systemUnderTest = new DatabaseAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    systemUnderTest,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DatabaseAddAccount Usecases', () => {
  test('Should call Encrypter with correct password <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    const spyOnEncrypterEncrypt = jest.spyOn(encrypterStub, 'encrypt')
    await systemUnderTest.add(signUpHttpRequestBodyMatchComplete)

    expect(spyOnEncrypterEncrypt).toHaveBeenCalledWith(signUpHttpRequestBodyMatchComplete.password)
  })

  test('Should throw if Encrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, encrypterStub } = await makeSystemUnderTest()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
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
