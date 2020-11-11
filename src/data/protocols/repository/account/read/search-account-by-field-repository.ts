import { IAccountModel } from '../import-all'

export interface ISearchAccountByFieldRepositoryParams {
  [field: string]: string
  id: string
  email: string
  accessToken: string
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
  * @param role
  * permission type
  */
  searchByField: (fields: ISearchAccountByFieldRepositoryParams, role?: string) => Promise<IAccountModel | null>
}
