import {
  IAddAccount, IAddAccountModel, IAccountModel,
  IHasher, IAddAccountRepository
} from './db-write-add-account-protocols'

export class DatabaseAddAccountController implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly writeAccountRepository: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const encryptedPassword = await this.hasher.hash(accountData.password)
    const account = await this.writeAccountRepository.add({
      ...accountData,
      password: encryptedPassword
    })

    return await Promise.resolve(account)
  }
}
