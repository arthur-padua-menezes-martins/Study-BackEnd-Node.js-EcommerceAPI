import {
  IDecrypter,
  ISearchAccountByAccessTokenRepository,
  IAccountModel
} from './db-read-search-account-by-access-token-protocols'

export class DatabaseSearchAccountByAccessToken implements ISearchAccountByAccessTokenRepository {
  constructor (private readonly decrypter: IDecrypter) {}

  async searchByAccessToken (accessToken: string, role?: string): Promise<IAccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
