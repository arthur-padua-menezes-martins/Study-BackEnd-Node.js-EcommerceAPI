import { IAccountModel } from '../import-all'

/**
* @interface
* specific interface to search an account by access token
* @method `searchByToken`
* search an account with selected access token and role
*/
export interface ISearchAccountByTokenRepository {
  /**
  * @param token
  * token to search an account
  * @param role
  * permission type
  */
  searchByToken: (token: string, role?: string) => Promise<IAccountModel | null>
}
