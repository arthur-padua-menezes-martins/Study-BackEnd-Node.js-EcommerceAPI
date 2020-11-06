import { IAccountModel } from '../import-all'

export interface ISearchAccountByFieldRepositoryParams {
  [field: string]: string
  id: string
  email: string
}
/**
* @interface
* specific interface to search an account by its fields
* @method `searchByField`
* search an account with selected fields
*/
export interface ISearchAccountByFieldRepository {
  /**
  * @param field
  * key and value to search an account
  */
  searchByField: (field: ISearchAccountByFieldRepositoryParams) => Promise<IAccountModel | null>
}
