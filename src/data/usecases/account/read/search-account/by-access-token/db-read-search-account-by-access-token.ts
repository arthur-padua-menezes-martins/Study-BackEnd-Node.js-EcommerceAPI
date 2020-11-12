import {
  IDecrypter,
  ISearchAccountByAccessTokenRepository,
  IAccountModel
} from './db-read-search-account-by-access-token-protocols'

export class DatabaseSearchAccountByAccessToken implements ISearchAccountByAccessTokenRepository {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly accountRepositoryRead: ISearchAccountByAccessTokenRepository
  ) {}

  async searchByAccessToken (accessToken: string, role?: string): Promise<IAccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)

    if (token) {
      const account = await this.accountRepositoryRead.searchByAccessToken(token)

      if (account) {
        return account
      }
    }

    return null
  }
}
