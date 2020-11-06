import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldModel,
  IAccountModel
} from './db-read-search-account-protocols'

export class DatabaseSearchAccountController implements ISearchAccountByFieldRepository {
  constructor (
    private readonly accountRepositoryRead: ISearchAccountByFieldRepository
  ) {}

  async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel | null> {
    const account = await this.accountRepositoryRead.searchByField({ email: '', id: '', ...field })

    return account
  }
}
