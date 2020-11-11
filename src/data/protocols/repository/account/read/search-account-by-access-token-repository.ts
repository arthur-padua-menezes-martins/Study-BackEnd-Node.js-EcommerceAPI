import { IAccountModel } from '../import-all'

/**
* @interface
* specific interface to search an account by access token
* @method `searchByAccessToken`
* search an account with selected access token and role
*/
export interface ISearchAccountByAccessTokenRepository {
  /**
  * @param accessToken
  * token to search an account
  * @param role
  * permission type
  */
  searchByAccessToken: (accessToken: string, role?: string) => Promise<IAccountModel | null>
}
