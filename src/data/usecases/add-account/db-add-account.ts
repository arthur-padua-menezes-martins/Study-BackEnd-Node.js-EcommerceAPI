import {
  IAddAccount, IAddAccountModel, IAccountModel,
  IEncrypter, IAddAccountRepository
} from './db-add-account-protocols'

export class DatabaseAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter
  private readonly addAccountRepository: IAddAccountRepository

  constructor (encrypter: IEncrypter, addAccountRepository: IAddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: encryptedPassword
    })
    console.log(account)
    return await Promise.resolve(account)
  }
}
