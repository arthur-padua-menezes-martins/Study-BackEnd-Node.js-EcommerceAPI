import {
  IAuthentication, IAuthenticationModel,
  ISearchAccountByFieldRepository,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository
} from './db-account-authentication-protocols'

export class DatabaseAccountAuthenticationController implements IAuthentication {
  private accessToken: string = ''

  constructor (
    private readonly accountRepositoryRead: ISearchAccountByFieldRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly accountRepositoryUpdate: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.accountRepositoryRead.searchByField({ id: '', email: authentication.email })

    if (account?.enabled) {
      if (await this.hashComparer.compare(authentication.password, account.personal.password)) {
        this.accessToken = await this.encrypter.encrypt(account.personal.id)
        await this.accountRepositoryUpdate.updateAccessToken(account.personal.id, this.accessToken)

        return this.accessToken
      }
    }

    return null
  }
}
