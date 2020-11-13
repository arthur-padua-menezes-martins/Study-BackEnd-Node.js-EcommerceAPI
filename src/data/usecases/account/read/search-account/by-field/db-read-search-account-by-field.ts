import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldModel,
  IAccountModel
} from './db-read-search-account-by-field-protocols'

export class DatabaseSearchAccountByField implements ISearchAccountByFieldRepository {
  constructor (private readonly accountRepositoryReadSearchAccountByField: ISearchAccountByFieldRepository) {}

  async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel | null> {
    const account = await this.accountRepositoryReadSearchAccountByField.searchByField({
      id: '', email: '', ...field
    })

    return account
  }
}
