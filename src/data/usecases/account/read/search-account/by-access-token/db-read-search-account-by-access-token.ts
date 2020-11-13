import {
  IDecrypter,
  ISearchAccountByAccessTokenRepository,
  IAccountModel
} from './db-read-search-account-by-access-token-protocols'

export class DatabaseSearchAccountByAccessToken implements ISearchAccountByAccessTokenRepository {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly accountRepositoryReadSearchAccountByAccessToken: ISearchAccountByAccessTokenRepository
  ) {}

  async searchByAccessToken (accessToken: string, role?: string): Promise<IAccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)

    if (token) {
      const account = await this.accountRepositoryReadSearchAccountByAccessToken.searchByAccessToken(token)

      if (account) {
        return account
      }
    }

    return null
  }
}
