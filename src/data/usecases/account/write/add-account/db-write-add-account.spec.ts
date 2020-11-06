import { DatabaseAddAccountController } from './db-write-add-account'
import {
  IAccountModel, IAddAccountModel,
  IHasher, IAddAccountRepository
} from './db-write-add-account-protocols'
import { signUpHttpRequestBodyMatch, accountModelDisabled } from './db-write-add-account-utils'

const makeHasher = async (): Promise<IHasher> => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve(accountModelDisabled.personal.password)
    }
  }

  return new HasherStub()
}

const makeAddAccountRepository = async (): Promise<IAddAccountRepository> => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      const acconunt: IAccountModel = accountModelDisabled
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

    const spyOnHash = jest.spyOn(hasherStub, 'hash')
    await systemUnderTest.add(signUpHttpRequestBodyMatch)

    expect(spyOnHash).toHaveBeenCalledWith(signUpHttpRequestBodyMatch.personal.password)
  })

  test('Should throw if Encrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, hasherStub } = await makeSystemUnderTest()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promiseAccount = systemUnderTest.add(signUpHttpRequestBodyMatch)

    await expect(promiseAccount).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, addAccountRepositoryStub } = await makeSystemUnderTest()

    const spyOnAdd = jest.spyOn(addAccountRepositoryStub, 'add')
    await systemUnderTest.add(signUpHttpRequestBodyMatch)

    expect(spyOnAdd).toHaveBeenCalledWith({
      personal: {
        ...signUpHttpRequestBodyMatch.personal,
        password: accountModelDisabled.personal.password
      },
      address: signUpHttpRequestBodyMatch.address,
      enabled: false
    })
  })

  test('Should return an account on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const account = await systemUnderTest.add(signUpHttpRequestBodyMatch)

    expect(account).toEqual({
      personal: {
        ...accountModelDisabled.personal
      },
      address: accountModelDisabled.address,
      enabled: false
    })
  })
})
