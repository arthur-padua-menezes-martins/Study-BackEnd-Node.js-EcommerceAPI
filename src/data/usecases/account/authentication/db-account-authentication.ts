import {
  IAuthentication, IAuthenticationModel,
  ISearchAccountByFieldRepository,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository
} from './db-account-authentication-protocols'

export class DatabaseAccountAuthenticationController implements IAuthentication {
  constructor (
    private readonly accountRepositoryRead: ISearchAccountByFieldRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly accountRepositoryUpdate: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.accountRepositoryRead.searchByField({
      id: '', accessToken: '', email: authentication.email
    })
    let accessToken: string = ''

    if (
      account?.enabled &&
      await this.hashComparer.compare(authentication.password, account.personal.password)
    ) {
      accessToken = await this.encrypter.encrypt(account.id)
      await this.accountRepositoryUpdate.updateAccessToken(account.id, accessToken)

      return accessToken
    }

    return null
  }
}
