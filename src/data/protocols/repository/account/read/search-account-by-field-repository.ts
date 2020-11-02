import { ISearchAccountByFieldModel } from '../../../../../domain/usecases/account/read/search-account-by-field'
import { IAccountModel } from '../import-all'

export interface ISearchAccountByFieldRepository {
  searchByField: (field: ISearchAccountByFieldModel) => Promise<IAccountModel | null>
}
