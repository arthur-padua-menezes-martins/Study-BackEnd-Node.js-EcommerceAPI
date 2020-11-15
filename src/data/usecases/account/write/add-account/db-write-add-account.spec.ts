import {
  DatabaseAddAccountController
} from './db-write-add-account'
import {
  ISearchAccountByFieldRepository,
  IHasher,
  IAddAccountRepository
} from './db-write-add-account-protocols'
import {
  makeReadAccount,
  makeHasherCryptography,
  makeWriteAccount
} from './db-write-add-account-make'
import {
  informationsOfSignUpHttpRequestBodyMatch,
  accountModelDisabled
} from './db-write-add-account-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddAccountController
  readAccountStub: ISearchAccountByFieldRepository
  hasherStub: IHasher
  writeAccountStub: IAddAccountRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const readAccountStub = await makeReadAccount()
  const hasherStub = await makeHasherCryptography()
  const writeAccountStub = await makeWriteAccount()
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
    await systemUnderTest.add(informationsOfSignUpHttpRequestBodyMatch)

    expect(spyOnHash).toHaveBeenCalledWith(informationsOfSignUpHttpRequestBodyMatch.personal.password)
  })

  test('Should throw if Encrypter throws <version: 0.0.1>', async () => {
    const { systemUnderTest, hasherStub } = await makeSystemUnderTest()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promiseAccount = systemUnderTest.add(informationsOfSignUpHttpRequestBodyMatch)

    await expect(promiseAccount).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()

    const spyOnAdd = jest.spyOn(writeAccountStub, 'add')
    await systemUnderTest.add(informationsOfSignUpHttpRequestBodyMatch)

    expect(spyOnAdd).toHaveBeenCalledWith({
      personal: {
        ...informationsOfSignUpHttpRequestBodyMatch.personal,
        password: accountModelDisabled.personal.password
      },
      address: informationsOfSignUpHttpRequestBodyMatch.address,
      accessToken: '',
      enabled: false
    })
  })

  test('Should return an account on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const account = await systemUnderTest.add(informationsOfSignUpHttpRequestBodyMatch)

    expect(account).toEqual({
      personal: {
        ...accountModelDisabled.personal
      },
      address: accountModelDisabled.address,
      enabled: accountModelDisabled.enabled,
      id: accountModelDisabled.id
    })
  })
})
