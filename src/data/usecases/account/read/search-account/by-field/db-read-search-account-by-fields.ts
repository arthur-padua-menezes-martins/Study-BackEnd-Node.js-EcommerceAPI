import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldModel,
  IAccountModel
} from './db-read-search-account-by-fields-protocols'

export class DatabaseSearchAccountByFields implements ISearchAccountByFieldRepository {
  constructor (private readonly accountRepositoryRead: ISearchAccountByFieldRepository) {}

  async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel | null> {
    const account = await this.accountRepositoryRead.searchByField({
      id: '', email: '', ...field
    })

    return account
  }
}
