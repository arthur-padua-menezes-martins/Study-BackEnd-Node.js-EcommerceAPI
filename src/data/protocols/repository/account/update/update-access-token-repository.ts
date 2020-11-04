/**
* @interface
* specific interface to update the accessToken field
* @method `add`
* update the accessToken value for a given account
*/
export interface IUpdateAccessTokenRepository {
  /**
  * @param id
  * id to search an account
  * @param accessToken
  * token to update the accessToken field
  */
  updateAccessToken: (id: string, accessToken: string) => Promise<void>
}
