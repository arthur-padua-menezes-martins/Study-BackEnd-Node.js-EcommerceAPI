import {
  ISearchAccountByFieldRepository,
  IHasher,
  IAddAccountRepository,
  IAddAccount, IAddAccountModel, IAccountModel
} from './db-write-add-account-protocols'
import {
  mongoHelper
} from './db-write-add-account-utils'

export class DatabaseAddAccountController implements IAddAccount {
  constructor (
    private readonly accountRepositoryRead: ISearchAccountByFieldRepository,
    private readonly hasher: IHasher,
    private readonly accountRepositoryWrite: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel | null> {
    let account: IAccountModel | null = await mongoHelper.map_id(await this.accountRepositoryRead.searchByField({ id: '', email: accountData.personal.email }))

    if (!account) {
      const encryptedPassword = await this.hasher.hash(accountData.personal.password)
      account = await this.accountRepositoryWrite.add({
        personal: {
          ...accountData.personal,
          password: encryptedPassword
        },
        address: accountData.address,
        enabled: false
      })

      return account
    } else if (account && !account.enabled) {
      return account
    }

    return null
  }
}
