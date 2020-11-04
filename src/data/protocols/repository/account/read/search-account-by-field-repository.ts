import { IAccountModel } from '../import-all'

interface IParams {
  id?: string
  email?: string
  cpf?: string
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
  searchByField: (field: IParams) => Promise<IAccountModel | null>
}
