import {
  ISearchAccountByFieldRepository,
  IHasher,
  IAddAccountRepository,
  IAddAccount, IAddAccountModel, IAccountModel
} from './db-write-add-account-protocols'

export class DatabaseAddAccountController implements IAddAccount {
  private account: IAccountModel | null

  constructor (
    private readonly accountRepositoryRead: ISearchAccountByFieldRepository,
    private readonly hasher: IHasher,
    private readonly accountRepositoryWrite: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel | null> {
    this.account = await this.accountRepositoryRead.searchByField({ id: '', email: accountData.personal.email })

    if (!(this.account)) {
      const encryptedPassword = await this.hasher.hash(accountData.personal.password)
      this.account = await this.accountRepositoryWrite.add({
        personal: {
          ...accountData.personal,
          password: encryptedPassword
        },
        address: accountData.address,
        enabled: false
      })

      return this.account
    } else if (!(this.account.enabled)) {
      return this.account
    }

    return null
  }
}
