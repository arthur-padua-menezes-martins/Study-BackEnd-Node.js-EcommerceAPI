export interface IUpdateAccessToken {
  /**
  * @param id
  * id to search an account
  * @param accessToken
  * token to update the accessToken field
  */
  updateAccessToken: (id: string, accessToken: string) => Promise<void>
}
