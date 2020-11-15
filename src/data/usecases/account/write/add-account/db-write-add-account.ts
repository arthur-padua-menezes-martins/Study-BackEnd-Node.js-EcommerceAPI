import {
  ISearchAccountByFieldRepository,
  IHasher,
  IAddAccountRepository,
  IAddAccount, IAddAccountModel, IAccountModel
} from './db-write-add-account-protocols'
import {
  MongoHelper
} from './db-write-add-account-utils'

export class DatabaseAddAccountController implements IAddAccount {
  constructor (
    private readonly accountRepositoryRead: ISearchAccountByFieldRepository,
    private readonly hasher: IHasher,
    private readonly accountRepositoryWrite: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel | null> {
    let account: IAccountModel | null = await MongoHelper.mapTheId(
      await this.accountRepositoryRead.searchByField({
        id: '', email: accountData.personal.email
      })
    )

    if (!account) {
      const encryptedPassword = await this.hasher.hash(accountData.personal.password)

      account = await this.accountRepositoryWrite.add({
        personal: Object.assign({}, accountData.personal, { password: encryptedPassword }),
        address: accountData.address,
        accessToken: '',
        enabled: false
      })

      return account
    } else if (account && !account.enabled) {
      return account
    }

    return null
  }
}
