import {
  IDecrypter,
  ISearchAccountByTokenRepository,
  IAccountModel
} from './db-read-search-account-by-access-token-protocols'

export class DatabaseSearchAccountByAccessToken implements ISearchAccountByTokenRepository {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly accountRepositoryReadSearchAccountByToken: ISearchAccountByTokenRepository
  ) {}

  async searchByToken (accessToken: string, role?: string): Promise<IAccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)

    if (token) {
      const account = await this.accountRepositoryReadSearchAccountByToken.searchByToken(accessToken, role)
      console.log('token: ', token)
      if (account) {
        return account
      }
    }

    return null
  }
}
