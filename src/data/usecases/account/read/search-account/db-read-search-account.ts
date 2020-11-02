import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldModel,
  IAccountModel
} from './db-read-search-account-protocols'

export class DatabaseSearchAccountController implements ISearchAccountByFieldRepository {
  constructor (
    private readonly searchAccountByFieldRepository: ISearchAccountByFieldRepository
  ) {}

  async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel | null> {
    const account = this.searchAccountByFieldRepository.searchByField(field)

    return await Promise.resolve(account)
  }
}
