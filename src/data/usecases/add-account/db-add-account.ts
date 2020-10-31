import {
  IAddAccount, IAddAccountModel, IAccountModel,
  IHasher, IAddAccountRepository
} from './db-add-account-protocols'

export class DatabaseAddAccountController implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const encryptedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: encryptedPassword
    })

    return await Promise.resolve(account)
  }
}
