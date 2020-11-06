import {
  IAddAccount, IAddAccountModel, IAccountModel,
  IHasher, IAddAccountRepository
} from './db-write-add-account-protocols'

export class DatabaseAddAccountController implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly accountRepositoryWrite: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const encryptedPassword = await this.hasher.hash(accountData.personal.password)
    const account = await this.accountRepositoryWrite.add({
      personal: {
        ...accountData.personal,
        password: encryptedPassword
      },
      address: accountData.address,
      enabled: false
    })

    return await Promise.resolve(account)
  }
}
