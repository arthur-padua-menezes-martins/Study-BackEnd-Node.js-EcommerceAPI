import {
  DatabaseAddAccountController
} from './db-write-add-account'
import {
  ISearchAccountByFieldRepository,
  IHasher,
  IAddAccountRepository
} from './db-write-add-account-protocols'
import {
  mockReadAccount,
  mockHasherCryptography,
  mockWriteAccount
} from './db-write-add-account-make'
import {
  informationsOfSignUpHttpRequest,
  informationsOfAccountModel
} from './db-write-add-account-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddAccountController
  readAccountStub: ISearchAccountByFieldRepository
  hasherStub: IHasher
  writeAccountStub: IAddAccountRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const readAccountStub = await mockReadAccount()
  const hasherStub = await mockHasherCryptography()
  const writeAccountStub = await mockWriteAccount()
  const systemUnderTest = new DatabaseAddAccountController(readAccountStub, hasherStub, writeAccountStub)

  return {
    systemUnderTest,
    readAccountStub,
    hasherStub,
    writeAccountStub
  }
}

describe('DatabaseAddAccountController', () => {
  test('Should call Encrypter with correct password <version: 0.0.1>', async () => {
    const { systemUnderTest, hasherStub } = await makeSystemUnderTest()

    const spyOnHash = jest.spyOn(hasherStub, 'hash')
    await systemUnderTest.add(informationsOfSignUpHttpRequest.bodyMatch)

    expect(spyOnHash).toHaveBeenCalledWith(informationsOfSignUpHttpRequest.bodyMatch.personal.password)
  })

  test('Should throw if Encrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, hasherStub } = await makeSystemUnderTest()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promiseAccount = systemUnderTest.add(informationsOfSignUpHttpRequest.bodyMatch)

    await expect(promiseAccount).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()

    const spyOnAdd = jest.spyOn(writeAccountStub, 'add')
    await systemUnderTest.add(informationsOfSignUpHttpRequest.bodyMatch)

    expect(spyOnAdd).toHaveBeenCalledWith({
      personal: {
        ...informationsOfSignUpHttpRequest.bodyMatch.personal,
        password: informationsOfAccountModel.disabled.personal.password
      },
      address: informationsOfSignUpHttpRequest.bodyMatch.address,
      accessToken: '',
      enabled: false
    })
  })

  test('Should return an account on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const account = await systemUnderTest.add(informationsOfSignUpHttpRequest.bodyMatch)

    expect(account).toEqual({
      ...informationsOfAccountModel.disabled,
      personal: {
        ...informationsOfAccountModel.disabled.personal
      }
    })
  })
})
